import { AdminPanelLayout } from "./AdminPanelLayout";
import { Navbar } from "./Navbar";
import { Card, CardContent } from "@/components/ui/card";
// import bgTexture from "@/assets/square.png";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const Layout = ({ title, children }: ContentLayoutProps) => {
  return (
    <>
      <AdminPanelLayout>
        <div>
          <Navbar title={title} />
          <div
            className="container pt-6 pb-8 px-4 sm:px-8"
            // style={{ backgroundImage: `url(${bgTexture})` }}
          >
            <Card className="rounded-lg border-none">
              <CardContent className="p-6 md:mb-1 mb-10">
                <div className="min-h-[calc(100vh-56px-64px-56px-48px)]">
                  {children}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminPanelLayout>
    </>
  );
};
