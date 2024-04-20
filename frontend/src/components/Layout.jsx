// src/components/Layout.js
import React from "react";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <div className="app-container flex justify-center items-center flex-col">
      {children}
    </div>
  );
};

export default Layout;
