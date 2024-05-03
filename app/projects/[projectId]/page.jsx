"use client";
import { ShareDetailsForm } from "@/components/Projects/ShareDataFrom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import service from "@/appwrite/config";

const ProjectDetails = () => {
  const params = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [project, setProject] = useState(null);
  useEffect(() => {
    console.log(params.projectId);
    service
      .getProject(params?.projectId)
      .then((response) => setProject(response));
  }, [params]);

  useLayoutEffect(() => {
    if (!isLoggedIn) redirect("/login");
  }, [isLoggedIn]);

  return project ? (
    <div>
      <div className="flex">
        <h2 className="flex-1 text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          {project.title}
        </h2>
        <ShareDetailsForm />
      </div>
      <div className="my-4">
        <div>
          {project.tags.map((tag) => (
            <Badge variant="secondary" className="mb-2 mr-2" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <Badge className="mb-2 mr-2">
            Age {project.age[0]} - {project.age[1]}
          </Badge>
          <Badge className="mb-2 mr-2">Gender {project.gender}</Badge>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8">{project.description}</p>
      <Separator className="my-4" />
      <p className="mt-6 text-sm leading-8 text-justify">{project.details}</p>
    </div>
  ) : null;
};

export default ProjectDetails;
