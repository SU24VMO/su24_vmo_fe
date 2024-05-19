import React from "react";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";

const SearchBar = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        className="px-3 py-2 w-[200px] tablet:min-w-72"
        placeholder="Tìm kiếm..."
      />
      <Button className="px-2" size="icon">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
