import React from "react";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log("searchValue đang nhấn vào:", searchValue);
    const normalizeAndEncode = (str) => encodeURIComponent(str.normalize('NFC') || " ");
    const searchParams = normalizeAndEncode(searchValue);
    navigate(`/viewCampaigns/search/${searchParams}`);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        className="px-3 py-2 mobile:w-[300px] tablet:w-[300px]"
        placeholder="Tìm kiếm chiến dịch..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 || e.which === 13) {
            handleSearch();
          }
        }}
      />
      <Button className="px-2" size="icon" onClick={handleSearch}>
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
