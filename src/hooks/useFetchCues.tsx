import { convertVTTTimeToSeconds } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export const fetchVTT = async (url: string) => {
  const response = await ky.get(url).text();
  return parseVTT(response);
};

interface Cue {
  startTime: number;
  endTime: number;
  text: string;
}

const parseVTT = (vttData: string): Cue[] => {
  const cues: Cue[] = [];
  const lines: string[] = vttData.split("\n");

  let startTime = "";
  let endTime = "";
  let text = "";

  lines.forEach((line: string) => {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const timeMatch = line.match(
      /(\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}\.\d{3})/,
    );
    if (timeMatch) {
      if (startTime && endTime && text) {
        cues.push({
          startTime: convertVTTTimeToSeconds(startTime),
          endTime: convertVTTTimeToSeconds(endTime),
          text,
        });
      }
      startTime = timeMatch[1]!;
      endTime = timeMatch[2]!;
      text = "";
    } else {
      text += (text ? " " : "") + line.trim();
    }
  });

  // Push the last cue if it exists
  if (startTime && endTime && text) {
    cues.push({
      startTime: convertVTTTimeToSeconds(startTime),
      endTime: convertVTTTimeToSeconds(endTime),
      text,
    });
  }

  return cues;
};

const useFetchCues = (src: string, recordId: string) => {
  return useQuery({
    queryKey: ["cues", recordId],
    queryFn: () => fetchVTT(src),
  });
};

export default useFetchCues;
