import { Input } from "@/components/ui/input"
import ProjectCard from "./ProjectCard"
const PROJECTS = [
  {title: "Project1", description: "This is project 1"},
  {title: "Project2", description: "This is project 1"},
  {title: "Project3", description: "This is project 1"},
  {title: "Project4", description: "This is project 1"},
  {title: "Project5", description: "This is project 1"},
  {title: "Project6", description: "This is project 1"},
]
const Projects = () => {
  return (
    <div className='h-screen max-w-96 m-auto p-10 flex justify-center items-center' >
       <div className="flex flex-col items-center justify-center h-full">
       <h1>Projects</h1>
       <Input type="text" placeholder="Search" />
       <div className="flex flex-row flex-wrap w-[90%]">
        {PROJECTS.map((project) =>{
        return <ProjectCard title = {project.title} description={project.description}/>
       })}
       </div>
       
        </div>
    </div>
  )
}

export default Projects
