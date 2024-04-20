import React from "react";
import { Table } from "react-bootstrap";

const generateTableRow = (label, value) => {
  return (
    <tr key={label}>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const DisplayTable = ({ processedData, errorMessage }) => {
  return (
    <div className="w-full">
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {processedData && (
        <Table striped bordered hover variant="light">
          <tbody>
            {/* Display the student name on the top row */}
            <tr>
              <td>NAME</td>
              <td>{processedData[0]["NAME"]}</td>
            </tr>

            {/* Display other rows */}
            {Object.keys(processedData[0])
              .filter((key) => key !== "NAME") // Exclude the name from the rows
              .map((key) => generateTableRow(key, processedData[0][key]))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DisplayTable;
