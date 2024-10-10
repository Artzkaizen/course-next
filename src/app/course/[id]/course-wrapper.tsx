"use client";

import CourseTabs from "@/components/course-tabs";
import VideoPlayer from "@/components/video-player";
import useCourseStore from "@/hooks/useCourseStore";

const CourseWrapper = () => {
  const { currentTopic } = useCourseStore();
  return (
    <>
      <VideoPlayer
        topic={currentTopic}
        src={`https://vroom.b-trend.media/presentation/${currentTopic?.recording_id}/video/webcams.webm`}
      />
      <CourseTabs topic={currentTopic} />
    </>
  );
};

export default CourseWrapper;
