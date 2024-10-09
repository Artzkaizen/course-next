import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const convertVTTTimeToSeconds = (time: string) => {
  const [m, s] = time.split(":");
  const seconds = parseFloat(s!.replace(".", "")) / 1000;
  return parseInt(m!) * 60 + seconds;
};
