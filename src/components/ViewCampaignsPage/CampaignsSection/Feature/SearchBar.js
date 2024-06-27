import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <>
      <div className="flex space-x-3 p-3 border bg-background rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex-[1_0_0%]">
          <Input
            type="search"
            className="h-full"
            placeholder="Tìm kiếm tên chiến dịch..."
          />
        </div>
        <div className="flex-[0_0_auto]">
          <Button size={"icon"}>
            <SearchIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
