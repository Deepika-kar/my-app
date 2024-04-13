import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
const PROJECTS = [
  { title: "Project1", description: "This is project 1" },
  { title: "Project2", description: "This is project 1" },
  { title: "Project3", description: "This is project 1" },
  { title: "Project4", description: "This is project 1" },
  { title: "Project5", description: "This is project 1" },
  { title: "Project6", description: "This is project 1" },
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
