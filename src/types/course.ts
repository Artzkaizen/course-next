export interface CourseInfo {
  record_id: string;
  course_module_id: string;
  data_id: string;
  datum: string;
  lernfeld: string;
  tagesinhalte: string;
  tafelbild: string;
  präsentation: string | null;
  group_id: string | null;
  group_name: string | null;
  recording_id: string | null;
}
