"use client";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Search, CircleX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import service from "@/appwrite/config";

const Projects = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useLayoutEffect(() => {
    if (!isLoggedIn) redirect("/login");
  }, [isLoggedIn]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects || []);
  const formik = useFormik({
    initialValues: {
      age: null,
      male: true,
      female: false,
      text: "",
    },
    onSubmit: (values) => {
      const projects = PROJECTS.filter((project) => {
        if (values.age) {
          return values.age >= project.age[0] && values.age <= project.age[1];
        }
        return true;
      })
        .filter((project) => {
          if (values.male || values.female) {
            if (values.male && values.female) {
              return true;
            }
            if (values.male) {
              return project.gender === "M";
            }
            if (values.female) {
              return project.gender === "F";
            }
          }
          return true;
        })
        .filter(
          (project) =>
            project.title.toLowerCase().includes(values.text.toLowerCase()) ||
            project.tags.some((tag) =>
              tag.toLowerCase().includes(values.text.toLowerCase())
            )
        );
      setFilteredProjects(projects);
    },
  });
  useEffect(() => {
    service.getProjects().then((data) => {
      console.log(data?.documents);
      setProjects(data?.documents);
      setFilteredProjects(data?.documents);
    });
  }, []);

  return (
    <div className="flex flex-col justify-start align-center">
      <div className="flex items-center w-full mx-auto mb-10 space-x-2">
        <Input
          className="w-40"
          type="number"
          placeholder="Enter age"
          value={formik.values.age}
          onChange={(e) => formik.setFieldValue("age", e.target.value)}
        />
        <Select
          onValueChange={(value) => formik.setFieldValue("gender", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="M">Male</SelectItem>
              <SelectItem value="F">Female</SelectItem>
              <SelectItem value="All">All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Search Projects"
          value={formik.values.text}
          onChange={(e) => formik.setFieldValue("text", e.target.value)}
        />
        <Button size="icon">
          <Search onClick={formik.handleSubmit} className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <CircleX
            onClick={() => {
              formik.handleReset();
              setFilteredProjects(PROJECTS);
            }}
            className="w-4 h-4"
          />
        </Button>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredProjects?.length
          ? filteredProjects.map(
              ({ title, description, tags, age, gender, $id }) => {
                return (
                  <ProjectCard
                    key={title}
                    title={title}
                    description={description}
                    tags={tags}
                    age={age}
                    gender={gender}
                    id={$id}
                  />
                );
              }
            )
          : null}
      </div>
    </div>
  );
};

export default Projects;
