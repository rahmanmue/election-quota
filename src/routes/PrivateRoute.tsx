import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface PrivateRouteProps {
  roles?: string[];
}

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  try {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    const decoded = jwtDecode<CustomJwtPayload>(isAuthenticated);

    const role = decoded.role;

    if (roles && !roles.includes(role as string)) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
