import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/landing-page/Navbar";
import { Link } from "react-router-dom";
import { RegisterType } from "@/services/authService";

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
    <>
      <Navbar />
      <div className="h-[90vh] flex flex-col items-center justify-center">
        <div className="group relative">
          <div className="absolute inset-0 bg-primary rounded-xl transform transition-transform duration-300 group-hover:rotate-2 group-hover:p-1 group-hover:rounded-sm" />
          <Card className="relative z-10 md:w-[450px] w-[350px]">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Register Your Account before{" "}
                <Link to="/login" className="text-primary">
                  Login.
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 ">
                    <Label className="mb-1" htmlFor="username">
                      Username
                    </Label>
                    <Input
                      id="usernmae"
                      type="text"
                      placeholder="Masukan Username"
                    />
                  </div>
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
                  <div className="flex flex-col space-y-1.5 ">
                    <Label className="mb-1" htmlFor="confirm_password">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      placeholder="Masukan Confirm Password"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign Up</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
