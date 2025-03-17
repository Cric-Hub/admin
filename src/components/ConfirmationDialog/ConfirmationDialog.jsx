import React from "react";
import "./confirmationDialog.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel, confirmLabel, cancelLabel }) => (
  <div className="confirmation-overlay">
    <div className="confirmation-box">
      <p>{message}</p>
      <div className="confirmation-actions">
        <button onClick={onConfirm}>{confirmLabel}</button>
        <button onClick={onCancel}>{cancelLabel}</button>
      </div>
    </div>
  </div>
);

export default ConfirmationDialog;
