// SearchButton.js
import React from "react";
import { Button } from "react-bootstrap";

const SearchButton = ({ handleButtonAction, buttonText }) => {
  return (
    <Button variant="primary" onClick={handleButtonAction} className="me-2">
      {buttonText}
    </Button>
  );
};

export default SearchButton;
