"use client";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { ShieldPlus, Menu, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import authService from "../../appwrite/auth";
import { logout } from "../../store/AuthSlice";
import { ProfileIcon } from "./ProfileIcon";
const NAVS = [
  {
    title: "My Projects",
    url: "/my-projects",
  },
  {
    title: "All Projects",
    url: "/projects",
  },
];

const NavItem = ({ title, url }) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md group h-9 w-max focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
        href={url}
      >
        {title}
      </Link>
    </NavigationMenuLink>
  );
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    pathname !== "/login" && (
      <header className="flex items-center justify-between w-full h-20 px-4 shrink-0 md:px-6">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="outline">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/">
                <ShieldPlus className="w-6 h-6" />
              </Link>
              <div className="grid gap-2 py-6">
                {NAVS.map(({ title, url }) => (
                  <Link
                    className="flex items-center w-full py-2 text-lg font-semibold"
                    href={url}
                    key={title}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link className="hidden mr-6 lg:flex" href="/">
            <ShieldPlus className="w-6 h-6" />
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {NAVS.map(({ title, url }) => (
                <NavItem key={title} title={title} url={url} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {isLoggedIn ? <ProfileIcon /> : <Button>Login</Button>}
      </header>
    )
  );
}
