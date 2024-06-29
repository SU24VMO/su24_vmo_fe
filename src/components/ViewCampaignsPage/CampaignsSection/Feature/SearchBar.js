import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar = ({ setSelectedCampaignName }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const handleSearch = () => {
    console.log("searchValue đang nhấn vào:", searchValue);
    setSelectedCampaignName(searchValue);
  };
  return (
    <>
      <div className="flex space-x-3 p-3 border bg-background rounded-lg shadow-lg w-full tablet:max-w-sm">
        <div className="flex-[1_0_0%]">
          <Input
            type="search"
            className="h-full"
            placeholder="Tìm kiếm tên chiến dịch..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.which === 13) {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="flex-[0_0_auto]">
          <Button variant={"ghost"} size={"icon"} onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
