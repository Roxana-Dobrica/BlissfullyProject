import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "/src/UserContext";
import { Outlet } from "react-router-dom";

function AnonymousRoute({ element }) {
  const { user } = useUser();
  return user ? <Navigate to="/" replace /> : element;
}

export default AnonymousRoute;
