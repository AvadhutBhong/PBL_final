import pandas as pd
import tabula
import os
 

 
def calculate_rank(df):
  ranks=df['Effective Total'].rank(ascending=False).astype(int) #.rank method is method in pandas and astype convert it to int
  df['Rank']=ranks
  return df

def calculate_percentile(df):
  percentiles=(len(df)-df['Rank'])/(len(df)-1)*100
  df['Percentile']=percentiles
  return df

def get_amcat_dataframe(file_name):
  
    try:
        # Check if the uploaded file is a PDF
        if file_name.endswith('.pdf'):
            # Convert the PDF to CSV using tabula
            csv_file_path = file_name.replace('.pdf', '.csv')
            tabula.convert_into(file_name, csv_file_path, output_format='csv', pages='all')

            # Read the CSV file into a DataFrame
            df = pd.read_csv(csv_file_path)
        else:
            # Assume it's an Excel file
            df=pd.DataFrame(pd.read_excel(file_name))
  
        # df=pd.DataFrame(pd.read_excel(file_name))
        df.drop(['Managerial In-basket Simulation (Effective Communication) (Score)',
                'Managerial In-basket Simulation (Planning and Scheduling) (Score)',
                'Managerial In-basket Simulation (Process Adherance) (Score)',
                'Managerial In-basket Simulation (Prioritization) (Score)',
                'Managerial In-basket Simulation (Work Allocation) (Score)'],axis=1,inplace=True)
        
        
        # subjects=['Critical Reasoning(Scores out of 900 Marks)',
        #         'Logical Ability(Scores out of 900Marks)',
        #         'Automata(Scores out of 100 Marks)',
        #         'C++ Programming(Scores out of 900 Marks)',
        #         'Quantitative Ability(Scores out of 900 Marks)',
        #         'English Comprehension(Scores out of 900 Marks)',
        #         'Managerial In-basket Simulation (Effective Communication) (Score)',
        #         'Managerial In-basket Simulation (Planning and Scheduling) (Score)',
        #         'Managerial In-basket Simulation (Process Adherance) (Score)',
        #         'Managerial In-basket Simulation (Prioritization) (Score)',
        #         'Managerial In-basket Simulation (Work Allocation) (Score)']
        
        effective_subjects=['Critical Reasoning(Scores out of 900 Marks)',
            'Logical Ability(Scores out of 900Marks)',
            'Automata(Scores out of 100 Marks)',
            'C++ Programming(Scores out of 900 Marks)',
            'Quantitative Ability(Scores out of 900 Marks)',
            'English Comprehension(Scores out of 900 Marks)']

        
        #creating an empty column Effective Total
        df['Effective Total']=df[effective_subjects].sum(axis=1)

        df['Rank']=0
        df=calculate_rank(df.copy())

        df['Percentile']=0
        df=calculate_percentile(df.copy())
        
        
        return df
    
    except Exception as e:
        return None  # Return None if any exception occurs during file processing
    finally:
        if 'csv_file_path' in locals() and os.path.exists(csv_file_path):
            os.remove(csv_file_path)  # Remove the CSV file after processing
