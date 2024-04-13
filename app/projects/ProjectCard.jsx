import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectCard = ({ title, description, tags, age, gender }) => {
  return (
    <Card className="transition-all duration-500 cursor-pointer hover:scale-105">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-justify">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tags.map((tag) => (
          <Badge className="mb-2 mr-2" key={tag}>
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter>
        <h5>Age</h5>
        <Badge
          variant="outline"
          className="mx-2"
        >{`${age[0]}-${age[1]}`}</Badge>
        <h5>Gender</h5>
        <Badge variant="outline" className="mx-2">
          {gender}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
