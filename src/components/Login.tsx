import React from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginType } from "../types";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  const handleGoogleLogin = () => {
    // Redirect ke backend untuk memulai proses login dengan Google
    window.location.href = "http://localhost:5000/google";
  };
  return (
    <>
      <button type="button" onClick={handleSubmit}>
        Klik Disini
      </button>

      <Button>Click Me</Button>

      <button onClick={handleGoogleLogin}>Login Googel</button>
    </>
  );
};

export default Login;
