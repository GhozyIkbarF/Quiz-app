import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Metadata from "@/components/GenerateMetadata";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { storage } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  })

const inputList: Array<{
  label: string;
  name: "email" | "password";
  type?: string;
}> = [
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const defaultValues = inputList.reduce((acc, input) => {
    acc[input.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login();
    storage.setItem("token", "soijoerjoeigjojgojgodijfi");
    navigate("/");
    // if (values.email === "email@gmail.com" && values.password === "123456") {
    //   navigate("/");
    // } else {
    //   toast({
    //     title: "Invalid email or password",
    //     description: "Please try again",
    //     variant: "default",
        
    //   });
    // }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen grid place-items-center">
      <Metadata title="Login" desc="Login page" />
      <Card className="max-w-80 w-full">
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col items-end"
            >
              {inputList.map((input) => (
                <FormField
                  key={input.name}
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start">
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                        <Input type={input.type} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div>
        <p className="text-center mt-4">
          Email and password is up to you
        </p>
      </div>
    </div>
  );
};

export default Login;
