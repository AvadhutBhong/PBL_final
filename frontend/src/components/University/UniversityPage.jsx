import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadForm from "./UploadForm";
import ProcessButtons from "./ProcessButtons";
import DisplayTable from "./DisplayTable";

const UniversityPage = () => {
  const [file, setFile] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [processedData, setProcessedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleRollNumberChange = (e) => setRollNumber(e.target.value);

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response && response.data && response.data.file_path) {
        const file_path = response.data.file_path;

        const processResponse = await axios.get(
          `http://localhost:5000/process/${rollNumber}?file_path=${file_path}`
        );

        if (processResponse && processResponse.status === 404) {
          setProcessedData(null);
          setErrorMessage("No student data available for this roll number");
        } else if (
          processResponse &&
          processResponse.data &&
          processResponse.data.result
        ) {
          const processedData = JSON.parse(processResponse.data.result);
          setProcessedData(processedData);
          setErrorMessage(null);
        } else {
          console.error(
            "Error: Unexpected process response structure",
            processResponse
          );
          setProcessedData(null);
          setErrorMessage(
            "Error: Unexpected process response structure. Please try again."
          );
        }
      } else {
        console.error("Error: Unexpected upload response structure", response);
        setErrorMessage(
          "Error: Unexpected upload response structure. Please try again."
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setProcessedData(null);
      setErrorMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async () => {
    setLoading(true);

    try {
      if (!processedData || !processedData.file_path) {
        setErrorMessage(
          "No file uploaded or processed. Please upload a file and click 'Process'."
        );
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/process/${rollNumber}`,
        { params: { file_path: processedData.file_path } } 
      );

      if (response.data.result) {
        const processedData = JSON.parse(response.data.result);
        setProcessedData(processedData);
        setErrorMessage(null);
      } else {
        setProcessedData(null);
        setErrorMessage("No data present for the specified roll number.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setProcessedData(null);
      setErrorMessage("Error processing file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-dark mt-3 flex justify-center items-center flex-col ">
      <div className="bg-transparent w-[50%]">
        <Row>
          <Col>
            <UploadForm
              handleFileChange={handleFileChange}
              handleRollNumberChange={handleRollNumberChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ProcessButtons
              handleUpload={handleUpload}
              handleProcess={handleProcess}
              loading={loading}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <DisplayTable
              processedData={processedData}
              errorMessage={errorMessage}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UniversityPage;
