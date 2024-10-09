"use client";
import { useSearchParams } from "next/navigation";

const useCourse = () => {
  return useSearchParams().get("record");
};

export default useCourse;
