"use client";
import { type CourseInfo } from "@/types/course";
import { cn, formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { htmlToJson } from "@/lib/htmlToJson";
import { useVideoStore } from "@/hooks/useVideoStore";
import useFetchCues from "@/hooks/useFetchCues";
import { useSearchParams } from "next/navigation";

const tabs = [
  { id: "tagesinhalte", label: "Tagesinhalte" },
  { id: "tagesfolien", label: "Tagesfolien" },
  { id: "präsentation", label: "Präsentation" },
  { id: "discuss", label: "Discuss" },
  { id: "transcript", label: "Transcript" },
];

export interface Cue {
  startTime: number;
  endTime: number;
  text: string;
}

interface CourseTabsProps {
  topics: CourseInfo[];
}

export default function CourseTabs({ topics }: CourseTabsProps) {
  const record = useSearchParams().get("record");
  const topic = topics.find((topic) => topic.record_id === record);
  const { currentTime } = useVideoStore();
  const [activeTab, setActiveTab] = useState("tagesinhalte");
  const [activeCueIndex, setActiveCueIndex] = useState(-1);

  const cues = useFetchCues("/video.vtt", record ?? "");

  useEffect(() => {
    const index = cues.data?.findIndex(
      (cue) => currentTime >= cue.startTime && currentTime <= cue.endTime,
    );
    setActiveCueIndex(index!);
  }, [currentTime, cues]);

  const formatted = htmlToJson(topic?.tagesinhalte ?? "");

  return (
    <div className="mx-auto w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full border-b-2 px-1 py-4 text-center text-sm font-medium",
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 transition-all duration-300 ease-in-out"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "tagesinhalte" && (
        <div className="h-[20vh] w-[50vw]">
          <h3 className="text-lg font-medium">{formatted?.p.content ?? ""}</h3>
          <ul className="list-disc pl-5">
            {formatted?.ul.li.map((item, index) => (
              <li key={index}>{item.content}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 h-[70vh] w-full overflow-auto p-4">
        {activeTab === "transcript" && (
          <div>
            <h2 className="text-lg font-semibold">Transcript</h2>
            <div className="space-y-4">
              {cues.isError ? (
                <div>Error Fetching transcript</div>
              ) : cues.isPending ? (
                <div>Loading....</div>
              ) : (
                cues.data?.map((cue, index) => (
                  <div
                    key={index}
                    className={`flex cursor-pointer ${
                      activeCueIndex === index ? "bg-blue-100" : ""
                    }`}
                    // onClick={() => onTranscriptClick(cue.startTime)}
                  >
                    <span className="w-12 flex-shrink-0 text-gray-500">
                      {formatTime(cue.startTime)}
                    </span>
                    <p className="flex-grow">{cue.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "tagesfolien" && (
          <iframe
            className="h-full w-full"
            src={`https://staging.b-trend.digital/pluginfile.php/${topic?.tafelbild}`}
          ></iframe>
        )}
        {activeTab === "präsentation" && (
          <iframe
            className="h-full w-full"
            src={`https://staging.b-trend.digital/pluginfile.php/${topic?.präsentation}`}
          ></iframe>
        )}
        {activeTab === "discuss" && (
          <div className="h-[20vh] w-[50vw]">Discuss content goes here</div>
        )}
      </div>
    </div>
  );
}
