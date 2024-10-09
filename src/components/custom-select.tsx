import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CourseInfo } from "@/types/course";
import { useRouter, useSearchParams } from "next/navigation";

interface CustomSelectProps {
  items: CourseInfo[];
  label?: string;
  className?: string;
  placeholder: string;
}
export default function CustomSelect({
  items,
  label,
  className,
  placeholder,
}: CustomSelectProps) {
  const uniqueGroups = Array.from(
    new Map(
      items
        .filter((item) => item.group_id && item.group_name)
        .map((item) => [
          item.group_id,
          { group_id: item.group_id, group_name: item.group_name },
        ]),
    ).values(),
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("group");
      router.push(`?${params.toString()}`);
      return;
    }
    params.set("group", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="all">Alle Teilnehmer/innen</SelectItem>
          {uniqueGroups.map(
            (item) =>
              item.group_id && (
                <SelectItem key={item.group_id} value={item.group_name ?? ""}>
                  {item.group_name}
                </SelectItem>
              ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
