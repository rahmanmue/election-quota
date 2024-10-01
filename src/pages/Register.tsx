import React, { useState } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/landing-page/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RegisterType } from "@/services/authService";
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

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "name must be at least 2 character",
      })
      .max(50, {
        message: "name max be 50 character",
      }),
    email: z
      .string()
      .email({
        message: "email is not valid",
      })
      .min(1, {
        message: "email is not empty",
      }),
    password: z
      .string()
      .min(6, {
        message: "password must be at least 6 character",
      })
      .max(50, {
        message: "password max be 50 character",
      }),
    confPassword: z
      .string()
      .min(2, {
        message: "password must be at least 6 character",
      })
      .max(50, {
        message: "password max be 50 character",
      }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords don't match",
    path: ["confPassword"],
  });

const Register: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await register(values);
      toast({
        title: "Success",
        description: "Create Account success",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `${error.message}.`,
        description: "Enter data with a new email or login.",
      });
    }
  };

  // if (isAuthenticated) {
  //   navigate("/dashboard");
  // }
  return (
    <>
      <Navbar />
      <div className="h-max flex flex-col items-center justify-center">
        <div className="group relative my-8">
          <div className="absolute inset-0 bg-primary rounded-xl transform transition-transform duration-300 group-hover:rotate-2 group-hover:p-1 group-hover:rounded-sm" />
          <Form {...form}>
            <Card className="relative z-10 md:w-[450px] w-[350px]">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Register Your Account before{" "}
                    <Link to="/sign-in" className="text-primary">
                      Login.
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukan Username"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukan Email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Masukan Password"
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                              <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Masukan Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                {...field}
                              />
                              <span
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit">
                    Sign Up
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
