"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import { Textarea } from "../ui/textarea";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import authService from "@/appwrite/auth";
import service from "@/appwrite/config";

export function CreateProjectForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const formik = useFormik({
    initialValues: {
      title: "",
      details: "",
      description: "",
      tags: [],
      min: "",
      max: "",
      gender: "",
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        age: [Number(values.min), Number(values.max)],
        user: userData?.$id,
      };
      delete payload.min;
      delete payload.max;
      // setLoading(true);
      const submit = await service.createProject(payload);
      console.log(submit);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] m-1">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Create a new Project</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              placeholder="title for the project"
              id="title"
              className="col-span-3"
              value={formik.values.title}
              onChange={(e) => formik.setFieldValue("title", e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="message" className="text-right">
              Details
            </Label>
            <Textarea
              placeholder="Write something like share data because it would help us in ..."
              id="message"
              className="col-span-3"
              value={formik.values.details}
              onChange={(e) => formik.setFieldValue("details", e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              placeholder="Detailed description of the project"
              id="description"
              className="col-span-3"
              value={formik.values.description}
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="Add comma separated tags"
              className="col-span-3"
              value={formik.values.tags}
              onChange={(e) =>
                formik.setFieldValue("tags", e.target.value.split(","))
              }
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Select id="gender" onValueChange={(value) => console.log(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent
                onValueChange={(value) => {
                  formik.setFieldValue("gender", value);
                }}
              >
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="tags" className="text-right">
              Age
            </Label>
            <div className="flex justify-end col-span-3">
              <Input
                id="tags"
                type="number"
                className="mr-5"
                placeholder="min"
                value={formik.values.min}
                onChange={(e) =>
                  formik.setFieldValue("min", Number(e.target.value))
                }
              />
              <Input
                id="tags"
                type="number"
                placeholder="max"
                value={formik.values.max}
                onChange={(e) =>
                  formik.setFieldValue("max", Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={formik.handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
