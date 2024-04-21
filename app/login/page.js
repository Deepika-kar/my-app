"use client";
import { useLayoutEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";

import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";

function Page() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useLayoutEffect(() => {
    if (isLoggedIn) redirect("/projects");
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const userData = await authService.login(values.email, values.password);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) {
          toast({
            title: "Login Success",
            description: "Logged in as " + user?.name,
          });
          dispatch(login(user));
          setLoading(false);
          redirect("/projects");
        }
      }
    },
  });
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-[400px] my-auto mx-auto">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={formik.handleSubmit} disabled={loading}>
            {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
