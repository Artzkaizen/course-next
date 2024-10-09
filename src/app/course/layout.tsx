import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { api } from "@/trpc/server";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { cookies } = await import("next/headers");
  const courseTopics = await api.course.fetchInfo({ course: 18 });

  const sidebarState = cookies().get("sidebar:state")?.value;
  return (
    <SidebarLayout defaultOpen={sidebarState ? sidebarState === "true" : true}>
      <AppSidebar courses={courseTopics || []} />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md p-2">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
