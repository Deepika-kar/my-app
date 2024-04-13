import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectCard = ({ title, description, tags }) => {
  return (
    <Card className="transition-all duration-500 cursor-pointer hover:scale-105">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {tags.map((tag) => (
          <Badge className="mb-2 mr-2" key={tag}>
            {tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
