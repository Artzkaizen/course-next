import { api } from "@/trpc/server";

import CourseWrapper from "./course-wrapper";

const Page = async ({ params }: { params: { id: string } }) => {
  const courseTopics = await api.course.fetchInfo({
    course: parseInt(params.id),
  });

  if (!params.id) {
    return <div>This is course id page</div>;
  }

  return (
    <section className="h-full w-full">
      <CourseWrapper topics={courseTopics} />
      {/* <VideoPlayer topics={courseTopics} />
      <CourseTabs topics={courseTopics} /> */}
    </section>
  );
};

export default Page;
