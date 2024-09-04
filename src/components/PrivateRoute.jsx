// src/components/PrivateRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Assuming you have AuthContext

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Or use the user prop directly if not using context

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/sign-in" />}
    />
  );
};

export default PrivateRoute;
