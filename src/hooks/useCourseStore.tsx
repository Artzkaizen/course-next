import { type CourseInfo } from "@/types/course";
import { create } from "zustand";

type CourseStore = {
  topics: CourseInfo[];
  isPending: boolean;
  isError: boolean;
  currentTopic: CourseInfo | undefined;
  setIsError: (isPending: boolean) => void;
  setIsPending: (isPending: boolean) => void;
  setTopics: (topics: CourseInfo[]) => void;
  setCurrentTopic: (topic: CourseInfo | undefined) => void;
};

const useCourseStore = create<CourseStore>()((set) => ({
  topics: [],
  currentTopic: undefined,
  isPending: false,
  isError: false,
  setIsError: (isError) => set({ isError }),
  setIsPending: (isPending) => set({ isPending }),
  setTopics: (topics) => set(() => ({ topics })),
  setCurrentTopic: (currentTopic) => set(() => ({ currentTopic })),
}));

export default useCourseStore;
