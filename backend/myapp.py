import tabula
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import matplotlib as plt
from amcatProcess import get_amcat_dataframe
 
myapp = Flask(__name__)
CORS(myapp, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'pdf'}

myapp.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def identify_subject_columns(df, numeric_range=(0, 30), exclude_words=["R.NO.", "SEAT NO."]):
    subject_columns = []

    for column in df.columns:
        # Check if any exclude word is present in the column name
        if any(word.upper() in column.upper() for word in exclude_words):
            continue

        # Check if the column contains at least one numeric value within the specified range
        numeric_values = pd.to_numeric(df[column], errors='coerce')
        has_numeric_within_range = numeric_values.between(*numeric_range).any()

        if has_numeric_within_range:
            subject_columns.append(column)
    return subject_columns

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
      
def process_file(file_path, roll_number):
    try:
        # Check if the uploaded file is a PDF
        if file_path.endswith('.pdf'):
            # Convert the PDF to CSV using tabula
            csv_file_path = file_path.replace('.pdf', '.csv')
            tabula.convert_into(file_path, csv_file_path, output_format='csv', pages='all')

            # Read the CSV file into a DataFrame
            df = pd.read_csv(csv_file_path)
        else:
            # Assume it's an Excel file
            df = pd.read_excel(file_path)

        # Rest of the code remains the same

        student_result = df.loc[df['R.NO.'] == int(roll_number)]  # Convert roll_number to int

        if student_result.empty:
            return None  # Return None if no data is present for the specified roll number

        # DataFrame of individual student
        sr = pd.DataFrame(student_result)
        sr.replace('-', pd.NA, inplace=True)

        # Convert subject columns to numeric
        subjects = identify_subject_columns(sr)
        sr[subjects] = sr[subjects].apply(pd.to_numeric, errors='coerce')

        # Drop columns with NaN values
        sr.dropna(axis=1, how='any', inplace=True)

        # Calculate the total marks
        sr['TOTAL'] = sr[subjects].sum(axis=1)

        return sr

    except Exception as e:
        return None  # Return None if any exception occurs during file processing
    finally:
        if 'csv_file_path' in locals() and os.path.exists(csv_file_path):
            os.remove(csv_file_path)  # Remove the CSV file after processing

@myapp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        # Save the uploaded file to the 'uploads' folder
        file_path = os.path.join(myapp.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        return jsonify({'message': 'File uploaded successfully', 'file_path': file_path})
    else:
        return jsonify({'error': 'Invalid file type'}), 400
 
my_amcat_file = ''    
    
@myapp.route('/upload_amcat', methods=['POST'])
def upload_amcat_file():
    global my_amcat_file  # Declare my_amcat_file as a global variable
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        # Save the uploaded file to the 'uploads' folder
        file_path = os.path.join(myapp.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        my_amcat_file = file_path

        return jsonify({'file_path': file_path})
    else:
        return jsonify({'error': 'Invalid file type'}), 400
    
def get_indiv_amcat(mis_id):
    global my_amcat_file  # Declare my_amcat_file as a global variable
    df = get_amcat_dataframe(my_amcat_file)
     
    processed_df = df[df['collegeMisId'] == mis_id]  # Use df[] instead of df.iloc[]
    # Perform necessary operations on the file with the specified roll number

    if processed_df is None:
        return jsonify({'error': 'Error processing file or no data available for this roll number'}), 500

    if processed_df.empty:
        return jsonify({'result': []}), 404

    # Convert the DataFrame to JSON in the desired format
    result_json = {'columns': list(processed_df.columns), 'rows': processed_df.to_dict(orient='records')}

    # Return the JSON response without any additional message
    response = jsonify({'result': result_json})
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
    return response


@myapp.route('/get_indiv_amcat/<misId>', methods=['GET'])
def get_individual_amcat(misId):
    return get_indiv_amcat(misId)


@myapp.route('/process/<roll_number>', methods=['GET'])
def process_file_with_roll_number(roll_number):
    file_path = request.args.get('file_path')

    if not file_path:
        return jsonify({'error': 'File path not provided'}), 400

    # Perform necessary operations on the file with the specified roll number
    processed_df = process_file(file_path, roll_number)

    if processed_df is None:
        return jsonify({'error': 'Error processing file or no data available for this roll number'}), 500

    if processed_df.empty:
        return jsonify({'message': 'No student data available for this roll number'}), 404

    # Convert the DataFrame to JSON
    result_json = processed_df.to_json(orient='records')

    # Return the JSON response to the React frontend
    response = jsonify({'message': 'File processed successfully', 'result': result_json})
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
    return response



if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    myapp.run(debug=True)
