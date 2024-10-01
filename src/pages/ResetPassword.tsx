import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useNavigate, useParams } from "react-router-dom";
import PasswordService from "@/services/passwordService";
import { useToast } from "@/hooks/use-toast";

const passwordService = new PasswordService();

const formSchema = z
  .object({
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
    message: "Password & Confirm Password must match",
    path: ["confPassword"],
  });

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      const { message } = await passwordService.resetPassword(
        token as string,
        values
      );
      toast({
        title: "Success",
        description: message,
      });
      navigate("/sign-in");
    } catch (error: any) {
      toast({
        title: error.message,
        description: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <>
      <div className="h-[90vh] flex flex-col items-center justify-center">
        <div className="group relative">
          <div className="absolute inset-0 bg-primary rounded-xl transform transition-transform duration-300 group-hover:rotate-2 group-hover:p-1 group-hover:rounded-sm" />
          <Form {...form}>
            <Card className="relative z-10 md:w-[450px] w-[350px]">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
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
                    Reset
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

export default ResetPassword;
