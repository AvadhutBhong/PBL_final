import React from "react";
import Body from "./Body";
import Homecard from "./Homecard";

function Home() {
  return (
    <>
      <Body></Body>
      
        <h2 className="text-[#190482] text-bold text-4xl">Top Features</h2>
      
      <Homecard></Homecard>
    </>
  );
}

export default Home;
