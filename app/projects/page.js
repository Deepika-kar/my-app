import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
const PROJECTS = [
  {
    title: "Breast Cancer Treatment Outcomes Study",
    description:
      "Share your medical records if you've undergone chemotherapy for breast cancer. Help us understand treatment outcomes and improve therapies for breast cancer patients.",
    tags: ["breast cancer", "chemotherapy", "treatment outcomes", "oncology"],
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
  },
];

const Projects = () => {
  return (
    <div className="flex flex-col justify-start align-center">
      <div className="flex items-center w-full max-w-sm mx-auto mb-10 space-x-2">
        <Input type="email" placeholder="Search Projects" />
        <Button type="submit" size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((project) => {
          return (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
