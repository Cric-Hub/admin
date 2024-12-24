import React from "react";
import { CircularProgress } from "@mui/material";
import "./button.css";

const Button = ({ loading, text, onClick, disabled, loadingText = "Loading..." }) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={`lButton ${loading ? "loading" : ""}`}
    >
      {loading ? (
        <>
          <CircularProgress size={20} color="secondary" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
