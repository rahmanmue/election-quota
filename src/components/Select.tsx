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
  onChange?: (value: string) => void;
}

export const SelectDemo = ({ placeholder, select, onChange }: SelectProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {select.map((s, i) => (
            <SelectItem key={i} value={s.value}>
              {s.item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
