import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { student } = useAuth();
  if (!student) return <Navigate to="/login" replace />;
  return children;
}