import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRouteLogin({ children }) {
  const { currentUser } = useAuth();

  if (currentUser === "loading") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/signin" />;
  }
}
