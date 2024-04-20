// FileUpload.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import ResultTable from "./ResultTable";
import "./FileUpload.css"; // Add a separate CSS file for styling
import TableauDashboard from "./TableauDashboard";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [misId, setMisId] = useState("");
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dash, setDash] = useState(false);

  // Load file state from sessionStorage on component mount
  useEffect(() => {
    const storedFile = JSON.parse(sessionStorage.getItem("file"));
    if (storedFile) {
      setFile(storedFile);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Store file state in sessionStorage
    sessionStorage.setItem("file", JSON.stringify(selectedFile));
  };

  const handleUpload = async () => {
    setLoading(true);

    if (!file) {
      console.error("No file selected.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload_amcat",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response && response.data && response.data.file_path) {
        console.log("File uploaded successfully");
      } else {
        console.error("Error: Unexpected upload response structure", response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
    setDash(true);
  };

  const handleSearch = async () => {
    setLoading(true);

    if (!file || !misId) {
      console.error("File and roll number are required.");
      setLoading(false);
      return;
    }

    // Append two zeros at the end of misId
    const modifiedMisId = misId + "00";

    try {
      const response = await axios.get(
        `http://localhost:5000/get_indiv_amcat/${modifiedMisId}`,
        {
          params: { file_path: file.path },
        }
      );

      setTableData(response.data.result);
    } catch (error) {
      console.error("Error searching for individual result:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <center>
        <h2 className="font-bold w-[70%] text-[#3f3378]">
          This page is to analyse the AMCAT result data of a individual student!
        </h2>
      </center>

      <div className="flex justify-center items-center lg:w-[1520px] w-md-[720px] sm:w-[480px] mx-auto p-4">
        <Container className=" p-4 rounded-lg shadow-md w-60">
          <Row className="mb-3 w-[60%]">
            <label htmlFor="formFile" className="flex mb-2">
              Choose your AMCAT result file to Analyse
            </label>
            <Col md={7} className="mb-3">
              <InputGroup>
                <FormControl
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </InputGroup>
            </Col>
            <Col md={5} className="mb-3">
              <Button
                variant="success"
                onClick={handleUpload}
                className="btn w-full "
              >
                Generate Analysis
              </Button>
            </Col>
          </Row>
          {/* <br /> */}
          <hr />
          <br />
          {dash && <Row className="mb-2 pb-2 h-[700px] w-[95%] ">
            <Col md={12}><TableauDashboard/></Col>
            <br />
            <br />
            <hr />
          </Row>}
          
          <Row className="mb-3 w-[60%]">
          <label htmlFor="roll"className="flex mb-2">Check for Individual Candidate result </label>
            <Col md={7} className="mb-3 text-left">
              {/* <label htmlFor="#roll" className="ml-4">
                College Mis Id
              </label> */}
              
              <InputGroup>
              
                <FormControl
                  id="roll"
                  type="text"
                  placeholder="Enter your College Mis ID"
                  value={misId}
                  onChange={(e) => setMisId(e.target.value)}
                  className="form-control"
                />
              </InputGroup>
            </Col>
            <Col md={5} className="mb-3 rounded-lg">
              <button
                className="w-full text-white h-9 border rounded-lg bg-[#6846e5]"
                onClick={handleSearch}
              >
                Search
              </button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
            
              <ResultTable data={tableData} loading={loading} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FileUpload;
