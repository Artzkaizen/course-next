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

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type CourseInfo } from "@/types/course";

export function CustomPopover({
  data,
  record,
  module,
}: {
  record: string;
  data: string;
  module: string;
}) {
  const editUrl = (data: string, record: string) => {
    const string = process.env.NEXT_PUBLIC_MOODLE_EDIT_URL;
    return string?.replace("base", data).replace("record", record);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="absolute right-0 top-0 z-10">
        <Button
          variant="outline"
          className="border-0 bg-transparent p-1 shadow-none"
        >
          <DotsHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-1 p-1">
        <Button variant="ghost" asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_MOODLE_ADD_URL?.replace("module", module)}`}
          >
            Add
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href={editUrl(data, record) ?? ""}>Edit</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

interface NavLinkProps {
  topic: CourseInfo;
  group?: string;
  label: string;
  courseId: string;
  className?: string;
  searchParams: URLSearchParams;
}

const NavLink = ({
  topic,
  label,
  group,
  courseId,
  searchParams,
}: NavLinkProps) => {
  const formatDate = topic.datum
    ? new Date(Number(topic.datum) * 1000).toLocaleDateString("de-DE")
    : new Date().toLocaleDateString("de-DE");

  const getRoute = (value: string) => {
    return `/course/${courseId}?record=${value}${group ? `&group=${group}` : ""}`;
  };
  const route = getRoute(topic.record_id);
  const isActive =
    route.includes(searchParams.toString()) &&
    searchParams.toString().includes("record");

  return (
    <div
      className={`relative border-primary p-1 transition-all duration-300 hover:border-l-4 hover:bg-secondary-foreground/10 ${isActive ? "border-l-4 bg-primary/10" : ""}`}
    >
      <Link href={getRoute(topic.record_id)} className={"text-sm"}>
        <span className="font-medium">
          {label}

          <CustomPopover
            record={topic.record_id}
            data={topic.data_id}
            module={topic.course_module_id}
          />
        </span>
        <span className="block text-sm">{formatDate}</span>
      </Link>
    </div>
  );
};

export function AppSidebar() {
  const searchParams = useSearchParams();
  const { id: courseId } = useParams();
  const group = searchParams.get("group");

  const { data: topics } = useFetchCourseDetails(parseInt(courseId as string));

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
                topic={topic}
                group={group ?? ""}
                label={topic.lernfeld}
                searchParams={searchParams}
                courseId={courseId as string}
              />
            </SidebarItem>
          ))}
      </SidebarContent>
    </Sidebar>
  );
}
