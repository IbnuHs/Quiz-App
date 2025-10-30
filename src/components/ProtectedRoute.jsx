import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin")) || null;
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
