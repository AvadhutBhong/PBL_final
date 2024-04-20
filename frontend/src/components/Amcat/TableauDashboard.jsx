import React, { useEffect, useRef } from "react";
// import { createTableauEmbed } from "@tableau/embedding";

function TableauDashboard() {
  const dashboardUrl =
    "https://public.tableau.com/views/AMCATmaindashboard/Dashboard1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link";
  return (
    <div className="flex justify-center">
      <tableau-viz
        className="w-full"
        id="tableauViz"
        src={dashboardUrl}
        device="desktop"
      ></tableau-viz>
    </div>
  );
}

export default TableauDashboard;
