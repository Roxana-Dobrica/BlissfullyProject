import React from "react";
import { useUser } from "/src/UserContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function PrivateRoute({ element }) {
  const { user, loading } = useUser();

  if (loading) {
    return null;
  }

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

export default PrivateRoute;
