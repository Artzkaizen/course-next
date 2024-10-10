import { z, ZodError } from "zod";
import CourseWrapper from "./course-wrapper";
import { notFound } from "next/navigation";

const paramsSchema = z.object({
  id: z.coerce.number(),
});
const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = paramsSchema.parse(params);
    if (!id) {
      return <div>This is course id page</div>;
    }
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error(error.message);
    }
    return notFound();
  }

  return (
    <section className="h-full w-full">
      <CourseWrapper />
    </section>
  );
};

export default Page;
