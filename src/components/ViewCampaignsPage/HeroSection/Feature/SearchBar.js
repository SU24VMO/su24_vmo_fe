import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { SearchIcon } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
    return (
        <>
           <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                <div className="flex-[1_0_0%]">
                  <Input
                    className="h-full"
                    placeholder="Tìm kiếm..."
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