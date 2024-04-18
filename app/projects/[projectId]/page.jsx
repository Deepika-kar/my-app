"use client";
import { ShareDetailsForm } from "@/components/Projects/ShareDataFrom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

const PROJECT = {
  title: "Breast Cancer Treatment Outcomes Study",
  description:
    "Share your medical records if you've undergone chemotherapy for breast cancer. Help us understand treatment outcomes and improve therapies for breast cancer patients.",
  tags: ["breast cancer", "chemotherapy", "treatment outcomes", "oncology"],
  age: [18, 75],
  gender: "F",
  details:
    "The Breast Cancer Treatment Outcomes Study is a groundbreaking initiative aimed at revolutionizing breast cancer treatment through comprehensive data analysis and patient collaboration. At its core, this project seeks to harness the power of collective medical records to glean invaluable insights into the effectiveness of chemotherapy in treating breast cancer. By inviting individuals who have undergone chemotherapy for breast cancer to share their medical records, the project endeavors to unlock critical information that can enhance therapeutic strategies and ultimately improve outcomes for breast cancer patients worldwide./nBreast cancer remains one of the most prevalent and formidable diseases affecting women globally. Despite significant advancements in medical science and treatment modalities, there is still much to be learned about the intricacies of this complex illness and its response to chemotherapy. The Breast Cancer Treatment Outcomes Study represents a proactive approach to addressing these knowledge gaps by leveraging real-world patient data to inform clinical decision-making and refine treatment protocols./nThe significance of this initiative extends far beyond the realms of oncology; it embodies a collective effort to empower patients and healthcare professionals alike in the fight against breast cancer. By participating in the study and contributing their medical records, individuals have the opportunity to play an active role in shaping the future of breast cancer care. Moreover, by sharing their experiences and treatment outcomes, participants can potentially pave the way for more personalized and effective therapeutic interventions tailored to the unique needs of each patient.",
};
const ProjectDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useLayoutEffect(() => {
    if (!isLoggedIn) redirect("/login");
  }, [isLoggedIn]);

  return (
    <div>
      <div className="flex">
        <h2 className="flex-1 text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          {PROJECT.title}
        </h2>
        <ShareDetailsForm />
      </div>
      <div className="my-4">
        <div>
          {PROJECT.tags.map((tag) => (
            <Badge variant="secondary" className="mb-2 mr-2" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <Badge className="mb-2 mr-2">
            Age {PROJECT.age[0]} - {PROJECT.age[1]}
          </Badge>
          <Badge className="mb-2 mr-2">Gender {PROJECT.gender}</Badge>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8">{PROJECT.description}</p>
      <Separator className="my-4" />
      <p className="mt-6 text-sm leading-8 text-justify">{PROJECT.details}</p>
    </div>
  );
};

export default ProjectDetails;
