import React from "react";
import { useAuth } from "@/hooks/useAuth";

const Private: React.FC = () => {
  const { logoutUser } = useAuth();
  return <button onClick={logoutUser}>Logout</button>;
};

export default Private;
