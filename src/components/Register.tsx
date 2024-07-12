import React from "react";
import { useAuth } from "../hooks/useAuth";
import { RegisterType } from "../interfaces";

const Register: React.FC = () => {
  const { register } = useAuth();

  const handleRegister = async () => {
    const data = {
      name: "user1",
      email: "user1@gmail.com",
      password: "user123",
      confPassword: "user123",
    } as RegisterType;

    await register(data);
  };

  return (
    <button type="button" onClick={handleRegister}>
      Register
    </button>
  );
};

export default Register;
