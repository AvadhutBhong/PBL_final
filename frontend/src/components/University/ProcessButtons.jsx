// components/ProcessButtons.js
import React from "react";
import { Button } from "react-bootstrap";

const ProcessButtons = ({ handleUpload, handleProcess }) => {
  return (
    <div>
      <Button variant="info" onClick={handleUpload} className="me-2">
        Upload File
      </Button>
      <Button variant="success" onClick={handleProcess}>
        Process
      </Button>
    </div>
  );
};

export default ProcessButtons;
