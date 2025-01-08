import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoggedIn, authLoading } = useAuth();

  // If we are still checking auth status, optionally show a loader/spinner or return null
  if (authLoading) {
    return <div>Loading...</div>;
    // or return null if you prefer an empty screen
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
