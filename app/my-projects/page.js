"use client";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ProjectCard";
import { CreateProjectForm } from "@/components/Projects/CreateProjectFrom";

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
];

const Projects = () => {
  return (
    <div className="flex flex-col justify-start align-center">
      <div className="flex mb-10">
        <Input
          className="flex-1 mr-5"
          type="text"
          placeholder="Search your Projects"
          onChange={(e) => console.log(e.target.value)}
        />
        <CreateProjectForm />
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map(({ title, description, tags, age, gender }) => {
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
