import CourseTabs from "@/components/course-tabs";
import VideoPlayer from "@/components/video-player";
import { api } from "@/trpc/server";

const Page = async ({ params }: { params: { id: string } }) => {
  const courseTopics = await api.course.fetchInfo({
    course: parseInt(params.id),
  });

  return (
    <section className="h-full w-full">
      <VideoPlayer />
      <CourseTabs topics={courseTopics} />
    </section>
  );
};

export default Page;
