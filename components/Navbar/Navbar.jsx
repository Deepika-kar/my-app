"use client";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { ShieldPlus, Menu } from "lucide-react";

const NAVS = [
  {
    title: "My Projects",
    url: "/my-projects",
  },
  {
    title: "All Projects",
    url: "/projects",
  },
  // {
  //   title: "Profile",
  //   url: "/profile",
  // },
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
  return (
    <header className="flex items-center w-full h-20 px-4 shrink-0 md:px-6">
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
    </header>
  );
}
