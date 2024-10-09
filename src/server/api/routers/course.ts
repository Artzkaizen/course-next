import ky from "ky";
import { z } from "zod";

import { env } from "@/env";
import { type CourseInfo } from "@/types/course";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const fetchCourseInfo = async (courseId: number) => {
  const response = await ky
    .get(`${env.NEXT_PUBLIC_MOODLE_URL}?courseid=${courseId}`)
    .json<CourseInfo[]>()
    .then((data) => data.filter((course) => course.lernfeld !== null));

  return response;
};

export const courseRouter = createTRPCRouter({
  fetchInfo: publicProcedure
    .input(z.object({ course: z.number() }))
    .query(({ input }) => {
      return fetchCourseInfo(input.course);
    }),
});
