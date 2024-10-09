import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";

export default async function CourseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { cookies } = await import("next/headers");
  const sidebarState = cookies().get("sidebar:state")?.value;

  return (
    <SidebarLayout defaultOpen={sidebarState ? sidebarState === "true" : true}>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md p-2">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
