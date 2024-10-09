"use client";

import CourseTabs from "@/components/course-tabs";
import VideoPlayer from "@/components/video-player";
import { type CourseInfo } from "@/types/course";
import { useSearchParams } from "next/navigation";

const CourseWrapper = ({ topics }: { topics: CourseInfo[] }) => {
  const record = useSearchParams().get("record");
  const topic = topics.find((topic) => topic.record_id === record);
  return (
    <>
      <VideoPlayer topic={topic} />
      <CourseTabs topic={topic} />
    </>
  );
};

export default CourseWrapper;
