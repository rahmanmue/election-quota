import React, { useState } from "react";
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
import Navbar from "@/components/landing-page/Navbar";
import google from "@/assets/google.png";
import { ForgetPasswordModal } from "./ForgetPasswordModal";
import AuthService from "@/services/authService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "email is not valid",
    })
    .min(1, {
      message: "email is not empty",
    }),
  password: z.string().min(1, {
    message: "password is not empty",
  }),
});

const authSevice = new AuthService();

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `${error.message}.`,
        description: "Please enter valid data.",
      });
    }
  };

  // const handleSubmitTest = async () => {
  //   const data = {
  //     email: "rahman.muraman@gmail.com",
  //     password: "admin123",
  //   } as LoginType;

  //   await login(data);
  // };

  const handleGoogleLogin = () => {
    // Redirect ke backend untuk memulai proses login dengan Google
    window.location.href = authSevice.googleLogin();
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Navbar />
      <div className="h-[90vh] flex flex-col items-center justify-center">
        <div className="group relative">
          <div className="absolute inset-0 bg-primary rounded-xl transform transition-transform duration-300 group-hover:rotate-3 group-hover:p-1 group-hover:rounded-sm" />
          <Form {...form}>
            <Card className="relative z-10 md:w-[450px] w-[350px]">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Don't have Account{" "}
                    <Link to="/sign-up" className="text-primary">
                      Create Account.
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukan Email"
                              type="email"
                              id="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage  data-testid="email-error" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Masukan Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...field}
                              />
                              <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                                data-testid="button-eye"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage  data-testid="password-error" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col gap-2 w-full">
                    <Button className="w-full" type="submit" data-testid = "button-sigin">
                      Sign In
                    </Button>
                    {/* <Button onClick={handleSubmitTest}>Login Test</Button> */}
                  </div>
                </CardFooter>
              </form>
              <CardFooter>
                <Button
                  variant={"outline"}
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-3 w-full -mt-3"
                  data-testid = "button-sigin-google"
                >
                  <img src={google} alt="google-icon" className="w-5" />
                  Sign In With Google
                </Button>
              </CardFooter>
              <ForgetPasswordModal title="Forget Password">
                <span className="block text-sm underline -mt-3 mb-3 cursor-pointer text-center">
                  forget password?
                </span>
              </ForgetPasswordModal>
            </Card>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
