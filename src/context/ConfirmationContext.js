import React, { createContext, useContext, useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog.jsx"; 

// Create the context
const ConfirmationContext = createContext();

// Custom hook to use the context
export const useConfirmation = () => useContext(ConfirmationContext);

// Provider Component
export const ConfirmationProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  });

  const showConfirmation = ({
    message,
    onConfirm,
    onCancel,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
  }) => {
    setConfirmation({
      isOpen: true,
      message,
      onConfirm: onConfirm || (() => {}),
      onCancel: onCancel || closeConfirmation,
      confirmLabel,
      cancelLabel,
    });
  };

  const closeConfirmation = () => {
    setConfirmation((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmationContext.Provider value={{ showConfirmation, closeConfirmation }}>
      {children}
      {confirmation.isOpen && (
        <ConfirmationDialog
          message={confirmation.message}
          onConfirm={() => {
            confirmation.onConfirm();
            closeConfirmation();
          }}
          onCancel={() => {
            confirmation.onCancel();
            closeConfirmation();
          }}
          confirmLabel={confirmation.confirmLabel}
          cancelLabel={confirmation.cancelLabel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};
