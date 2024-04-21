"use client";
import { useState } from "react";
import { CircleUser, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

import authService from "@/appwrite/auth";
import { logout } from "@/store/AuthSlice";

export function ProfileIcon() {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogout = async () => {
    setLoading(true);
    const logoutSuccess = await authService.logout();
    if (logoutSuccess) {
      toast({
        title: "Logout Success",
        description: "Logged out",
      });
      dispatch(logout());
      redirect("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Failed to logout",
      });
    }
    setLoading(false);
  };
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
              <Button
                disabled={loading}
                variant="secondary"
                onClick={handleLogout}
              >
                {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                Logout
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
