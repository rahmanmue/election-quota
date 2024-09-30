import React from "react";
import { Link, useRouteError } from "react-router-dom";
import ErrorPageImage from "@/assets/error-page.svg";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.log(error);
  return (
    <div
      id="error-page"
      className="container h-screen flex flex-col justify-center items-center"
    >
      <img src={ErrorPageImage} alt="error-page" className="w-1/2" />

      <span className="font-medium">{error.statusText || error.message}</span>
      <Link to="/" className="underline text-green-600 font-semibold">
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
