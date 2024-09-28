import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/landing-page/Navbar";
import google from "@/assets/google.png";
import { ForgetPasswordModal } from "./ForgetPasswordModal";
import AuthService from "@/services/authService";
import { LoginType } from "@/services/authService";

const authSevice = new AuthService();

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/private" />;
  }

  const handleSubmit = async () => {
    const data = {
      email: "rahman.muraman@gmail.com",
      password: "admin123",
    } as LoginType;

    await login(data);
  };

  const handleGoogleLogin = () => {
    // Redirect ke backend untuk memulai proses login dengan Google
    window.location.href = authSevice.googleLogin();
  };
  return (
    <>
      <Navbar />
      <div className="h-[90vh] flex flex-col items-center justify-center">
        <div className="group relative">
          <div className="absolute inset-0 bg-primary rounded-xl transform transition-transform duration-300 group-hover:rotate-3 group-hover:p-1 group-hover:rounded-sm" />
          <Card className="relative z-10 md:w-[450px] w-[350px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Don't have Account{" "}
                <Link to="/register" className="text-primary">
                  Create Account.
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 ">
                    <Label className="mb-1" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukan Email"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <Label className="mb-1" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukan Password"
                    />
                  </div>
                </div>
              </form>

              <ForgetPasswordModal
                title="Forget Password"
                submitForm={() => alert("Hello")}
              >
                <span className="inline-block text-sm underline mt-3 cursor-pointer">
                  forget password?
                </span>
              </ForgetPasswordModal>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Sign In
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-3"
                >
                  <img src={google} alt="google-icon" className="w-5" />
                  Sign In With Google
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
