"use client";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormik } from "formik";
import { useLayoutEffect } from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

function Page() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useLayoutEffect(() => {
    if (isLoggedIn) redirect("/projects");
  }, [isLoggedIn]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const userData = await authService.login(values.email, values.password);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
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
          <Button onClick={formik.handleSubmit}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
