// components/UploadForm.js
import React from "react";
import { Form } from "react-bootstrap";

const UploadForm = ({ handleFileChange, handleRollNumberChange }) => {
  return (
    <Form className="w-full ">
      <Form.Group
        controlId="formFile"
        className="mb-3 flex justify-center flex-col"
      >
        <center>
          <Form.Label>Select your File for Analysis</Form.Label>
        </center>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group controlId="formRollNumber" className="mb-3">
        <Form.Label>Enter Roll Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Roll Number"
          onChange={handleRollNumberChange}
        />
      </Form.Group>
    </Form>
  );
};

export default UploadForm;
