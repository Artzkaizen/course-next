"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import CustomSelect from "./custom-select";
import { useParams, useSearchParams } from "next/navigation";
import useFetchCourseDetails from "@/hooks/useFetchCourseDetails";

interface NavLinkProps {
  label: string;
  route: string;
  date?: number;
  className?: string;
}

const NavLink = ({ label, date, route }: NavLinkProps) => {
  const searchParams = useSearchParams().toString();
  const formatDate = date
    ? new Date(date * 1000).toLocaleDateString("de-DE")
    : new Date().toLocaleDateString("de-DE");

  const isActive =
    route.includes(searchParams) && searchParams.includes("record");
  return (
    <Link
      href={route}
      className={`border-primary p-1 text-sm transition-all duration-300 hover:border-l-4 hover:bg-secondary-foreground/10 ${isActive ? "border-l-4 bg-primary/10" : ""}`}
    >
      <span className="font-medium">{label}</span>
      <span className="block text-sm">{formatDate}</span>
    </Link>
  );
};

export function AppSidebar() {
  const searchParams = useSearchParams();
  const { id: courseId } = useParams();
  const group = searchParams.get("group");

  const { data: topics } = useFetchCourseDetails(parseInt(courseId as string));

  const getRoute = (value: string) => {
    return `/course/${courseId as string}?record=${value}${group ? `&group=${group}` : ""}`;
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold">Übersicht</span>
        <CustomSelect
          className="ml-auto w-fit"
          items={topics ?? []}
          // label={"Gruppe Wähle"}
          placeholder={"Getrennte Gruppen"}
        />
      </SidebarHeader>
      <SidebarContent>
        {topics
          ?.filter((course) => {
            return group ? course.group_name === group : true;
          })
          .map((topic) => (
            <SidebarItem key={topic.record_id}>
              <NavLink
                label={topic.lernfeld}
                route={getRoute(topic.record_id)}
                date={parseInt(topic.datum)}
              />
            </SidebarItem>
          ))}
      </SidebarContent>
    </Sidebar>
  );
}
