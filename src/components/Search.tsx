import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchProps {
  placeholder: string;
  onSearch: (search: string) => void;
}

export const Search = ({ placeholder, onSearch }: SearchProps) => {
  const [search, setSearch] = useState<string>("");
  const handleSearch = () => {
    onSearch(search);
    setSearch("");
  };

  return (
    <div className="flex w-full max-w-sm justify-end space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={handleSearch}>Cari</Button>
    </div>
  );
};
