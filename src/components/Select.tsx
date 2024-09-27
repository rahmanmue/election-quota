import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  item: string;
}

interface SelectProps {
  placeholder: string;
  select: Option[];
}

export const SelectDemo = ({ placeholder, select }: SelectProps) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {select.map((s) => (
            <SelectItem value={s.value}>{s.item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
