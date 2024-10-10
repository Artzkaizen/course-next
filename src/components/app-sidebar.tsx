"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useMemo } from "react";
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
import { cn, parseMlangString } from "@/lib/utils";
import useCourseStore from "@/hooks/useCourseStore";
import { env } from "@/env";

export function CustomPopover({
  data,
  record,
  module,
  classname,
}: {
  classname?: string;
  record: string;
  data: string;
  module: string;
}) {
  const editUrl = (data: string, record: string) => {
    const string = env.NEXT_PUBLIC_MOODLE_EDIT_URL;
    return string?.replace("base", data).replace("record", record);
  };

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={cn("absolute right-0 top-0 z-10 opacity-0", classname)}
      >
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
            href={`${env.NEXT_PUBLIC_MOODLE_ADD_URL?.replace("module", module)}`}
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
    <Button
      asChild
      variant={"ghost"}
      className={`group relative flex h-fit flex-col items-start justify-start rounded-none border-primary transition-all duration-300 hover:border-l-4 hover:bg-primary/5 group-hover:block ${isActive ? "border-l-4 bg-primary/20" : ""}`}
    >
      <Link href={getRoute(topic.record_id)} className={"text-sm"}>
        <span className="w-64 overflow-hidden text-clip text-balance font-medium">
          {parseMlangString(label, "de")}

          <CustomPopover
            classname="group-hover:opacity-100"
            record={topic.record_id}
            data={topic.data_id}
            module={topic.course_module_id}
          />
        </span>
        <span className="block text-sm">{formatDate}</span>
      </Link>
    </Button>
  );
};

export function AppSidebar() {
  const searchParams = useSearchParams();
  const { id: courseId } = useParams();
  const group = searchParams.get("group");
  const record = searchParams.get("record");

  const { topics, setTopics, setIsPending, setIsError, setCurrentTopic } =
    useCourseStore();

  const { data, isError, isPending } = useFetchCourseDetails(
    parseInt(courseId as string),
  );

  const currentTopic = useMemo(() => {
    return topics.find((topic) => topic.record_id === record);
  }, [topics, record]);

  useEffect(() => {
    setTopics(data ?? []);
    setIsPending(isPending);
    setIsError(isError);
    setCurrentTopic(currentTopic);
  }, [
    currentTopic,
    data,
    isError,
    isPending,
    setCurrentTopic,
    setIsError,
    setIsPending,
    setTopics,
  ]);

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold">Übersicht</span>
        <CustomSelect
          className="ml-auto w-fit"
          items={topics}
          // label={"Gruppe Wähle"}
          placeholder={"Getrennte Gruppen"}
        />
      </SidebarHeader>
      <SidebarContent>
        {isPending ? (
          <div
            className={cn("h-10 w-full animate-pulse rounded-md bg-primary")}
          />
        ) : (
          topics
            ?.filter((topic) => {
              return group ? topic.group_name === group : true;
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
            ))
        )}
      </SidebarContent>
    </Sidebar>
  );
}
