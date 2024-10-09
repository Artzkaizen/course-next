import { fetchCourseInfo } from "@/app/course/actions";
import { useQuery } from "@tanstack/react-query";

const useFetchCourseDetails = (courseid: number) => {
  return useQuery({
    queryKey: ["course-details", courseid],
    queryFn: async () => fetchCourseInfo(courseid),
  });
};

export default useFetchCourseDetails;
