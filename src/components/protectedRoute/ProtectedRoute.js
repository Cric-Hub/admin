import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    // Redirect to login page if no user
    return <Navigate to="/login" />;
  }
  // Render the children components (protected route)
  return children;
};

export default ProtectedRoute;
