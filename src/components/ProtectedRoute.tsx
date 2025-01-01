import { getToken } from "@/utils/auth";
import React from "react";
import { Navigate } from "react-router-dom";

interface protectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: protectedRouteProps) => {
  if (getToken()) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
