import React from "react";
import "./CircularButton.css";

const CircularButton = () => {
  return (
    <button className="circular-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" /* Adjust size as needed */
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white" /* Arrow color */
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-arrow-right"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
};

export default CircularButton;
