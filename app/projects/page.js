import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
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
  );
};

export default Projects;
