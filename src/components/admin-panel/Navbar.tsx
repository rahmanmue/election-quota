import { ModeToggle } from "../mode-toggle";
import { UserNav } from "./UserNav";
import { SheetMenu } from "./SheetMenu";

interface NavbarProps {
  title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          {/* <UserNav /> */}
        </div>
      </div>
    </header>
  );
};
