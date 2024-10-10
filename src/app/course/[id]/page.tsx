import { api } from "@/trpc/server";
import { z, ZodError } from "zod";
import CourseWrapper from "./course-wrapper";
import { type CourseInfo } from "@/types/course";

const paramsSchema = z.object({
  id: z.coerce.number(),
});
const Page = async ({ params }: { params: { id: string } }) => {
  let courseTopics: CourseInfo[] = [];
  try {
    const { id } = paramsSchema.parse(params);
    if (!id) {
      return <div>This is course id page</div>;
    }
    courseTopics = await api.course.fetchInfo({
      course: id,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error(error.message);
    }
    return <div>Course not found</div>;
  }

  return (
    <section className="h-full w-full">
      <CourseWrapper topics={courseTopics} />
    </section>
  );
};

export default Page;
