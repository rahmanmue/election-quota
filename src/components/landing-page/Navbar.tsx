import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface RouterProps {
  href: string;
  label: string;
}

const routerList: RouterProps[] = [
  {
    href: "#home",
    label: "Home",
  },
  {
    href: "#dapil",
    label: "Dapil",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#login",
    label: "Login",
  },
  {
    href: "#register",
    label: "Register",
  },
];

export const Navbar = () => {
  const [open, isOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-10 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto px-4">
        <NavigationMenuList className="container h-14 px-4 w-screen flex md:justify-center  justify-between items-center relative">
          <NavigationMenuItem className="font-bold md:absolute left-6">
            <a
              rel="noreferrer noopener"
              href="/"
              className="font-bold text-xl flex"
            >
              Election Quota
            </a>
          </NavigationMenuItem>
          <nav className="hidden md:flex gap-2">
            {routerList.map((route: RouterProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:inline-block absolute right-6 ">
            <ModeToggle />
          </div>

          {/* mobile */}

          <span className="flex md:hidden">
            <ModeToggle />
            <Sheet open={open} onOpenChange={isOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => isOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl text-left">
                    Election Quota
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col items-start gap-2 mt-4">
                  {routerList.map((route: RouterProps, i) => (
                    <a
                      rel="noreferrer noopener"
                      href={route.href}
                      key={i}
                      className={`text-[17px] ${buttonVariants({
                        variant: "ghost",
                      })}`}
                    >
                      {route.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
