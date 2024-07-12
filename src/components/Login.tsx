import React from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginType } from "../interfaces";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();

  if (localStorage.getItem("token")) {
    return <Navigate to="/private" />;
  }

  const handleSubmit = async () => {
    const data = {
      email: "rahman.muraman@gmail.com",
      password: "rahasia",
    } as LoginType;

    await login(data);
  };
  return (
    <button type="button" onClick={handleSubmit}>
      Klik Disini
    </button>
  );
};

export default Login;
