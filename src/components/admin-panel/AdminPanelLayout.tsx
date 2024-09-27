import React from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/admin-panel/Footer";
import { Sidebar } from "./Sidebar";
import { RootState } from "@/store/store";

interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

export const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
  children,
}) => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
};
