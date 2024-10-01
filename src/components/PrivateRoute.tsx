import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decodedToken, loadFromLocalStorage } from "@/lib/authUtils";

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const authState = loadFromLocalStorage();

      if (authState && authState.token) {
        const decoded = decodedToken(authState.token);
        setIsAuthenticated(true);
        setUserRole(decoded?.role || null);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
    }
  }, []); // Use empty dependency array to run effect once

  if (isAuthenticated === null) {
    // Loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (roles && userRole && !roles.includes(userRole)) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
