import React from "react";
import FileUpload from "./FileUpload";
import TableauDashboard from "./TableauDashboard";

function Input_amcat() {
  return (
    <div className="flex justify-center flex-col">
      <center>
        <FileUpload></FileUpload>
        <hr />
        <br />
        {/* <TableauDashboard></TableauDashboard> */}
      </center>
    </div>
  );
}

export default Input_amcat;
