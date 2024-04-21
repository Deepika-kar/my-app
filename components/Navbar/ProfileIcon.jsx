"use client";
import { CircleUser, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSelector } from "react-redux";

export function ProfileIcon() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="cursor-pointer">
      <HoverCard>
        <HoverCardTrigger asChild>
          <CircleUser />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex items-start justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{userData?.name}</h4>
              <p className="text-sm">Role : {userData?.prefs?.type}</p>
              <div className="flex items-center pt-2">
                <Mail className="w-4 h-4 mr-2 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {userData?.email}
                </span>
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="secondary">Logout</Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
