"use client";
import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
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
import { useState } from "react";

const PROJECTS = [
  {
    title: "Breast Cancer Treatment Outcomes Study",
    description:
      "Share your medical records if you've undergone chemotherapy for breast cancer. Help us understand treatment outcomes and improve therapies for breast cancer patients.",
    tags: ["breast cancer", "chemotherapy", "treatment outcomes", "oncology"],
    age: [18, 75],
    gender: "F",
  },
  {
    title: "Alzheimer's Disease Symptom Progression Research",
    description:
      "Participate in our study if you're experiencing memory loss. Share your medical records to help us track symptom progression and develop interventions for Alzheimer's disease.",
    tags: [
      "Alzheimer's disease",
      "memory loss",
      "symptom progression",
      "neurology",
    ],
    age: [50, 90],
    gender: "M",
  },
  {
    title: "Type 2 Diabetes Management Trial",
    description:
      "Enroll in our trial if you're managing type 2 diabetes. Share your medical records to help us evaluate treatment approaches and improve diabetes management strategies.",
    tags: [
      "type 2 diabetes",
      "diabetes management",
      "clinical trial",
      "endocrinology",
    ],
    age: [18, 80],
    gender: "F",
  },
  {
    title: "Chronic Cough Treatment Study",
    description:
      "Join our study if you suffer from chronic cough. Share your medical records to help us understand the underlying causes and develop effective treatments.",
    tags: [
      "chronic cough",
      "cough treatment",
      "respiratory health",
      "pulmonology",
    ],
    age: [18, 90],
    gender: "All",
  },
  {
    title: "COVID-19 Vaccine Side Effects Monitoring",
    description:
      "Participate in our monitoring program if you've received the COVID-19 vaccine. Share your medical records to help us track and manage vaccine side effects.",
    tags: [
      "COVID-19 vaccine",
      "vaccine side effects",
      "monitoring program",
      "public health",
    ],
    age: [18, 100],
    gender: "All",
  },
  {
    title: "Radiation Therapy Adverse Effects Research",
    description:
      "Contribute your medical records if you've undergone radiation therapy. Help us investigate adverse effects and improve radiation therapy outcomes.",
    tags: [
      "radiation therapy",
      "adverse effects",
      "cancer treatment",
      "oncology",
    ],
    age: [18, 85],
    gender: "All",
  },
];

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
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
        {filteredProjects.map(({ title, description, tags, age, gender }) => {
          return (
            <ProjectCard
              key={title}
              title={title}
              description={description}
              tags={tags}
              age={age}
              gender={gender}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
