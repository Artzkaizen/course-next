"use server";

import { api } from "@/trpc/server";

export const fetchCourseInfo = async (id: number) => {
  return await api.course.fetchInfo({ course: id });
};
