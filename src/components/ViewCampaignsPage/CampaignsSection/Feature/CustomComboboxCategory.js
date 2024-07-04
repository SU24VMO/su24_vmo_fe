import React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { GET_CAMPAIGN_TYPE } from "../../../../api/apiConstants";
import { axiosPublic } from "../../../../api/axiosInstance";
import { Skeleton } from "../../../ui/skeleton";

const CustomComboboxCategory = ({ setSelectedCampaignTypeID }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  // Hàm lấy dữ liệu notification từ API
  const fetchData = React.useCallback(async () => {
    try {
      const response = await axiosPublic.get(GET_CAMPAIGN_TYPE);
      if (response.status === 200) {
        setData(response.data.data.list);
        // console.log("All Campaign Type:", response.data.data.list);
      }
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }, []);
  // Lấy dữ liệu notification từ API
  React.useEffect(() => {
    fetchData();
  }, [fetchData]); // Chỉ gọi lại khi fetchData thay đổi (thực ra nó chỉ chạy 1 lần duy nhất vì fetchData không thay đổi =)))
  // console.log("Value vừa chọn:", value);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value
              ? Array.isArray(data)
                ? data.find((item) => item.name === value)?.name
                : "Chọn danh mục"
              : "Chọn danh mục"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm danh mục..." />
            <CommandEmpty>Không tìm được danh mục chiến dịch 😥</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {dataLoaded ? (
                  Array.isArray(data) ? (
                    data.map((item) => (
                      <CommandItem
                        key={item.campaignTypeID}
                        value={item.name}
                        onSelect={(currentValue) => {
                          const newValue =
                            currentValue === value ? "" : currentValue;
                          setValue(newValue);
                          setSelectedCampaignTypeID(
                            newValue === "" ? "" : item.campaignTypeID
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item.name === value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandEmpty>
                      Không tìm được danh mục chiến dịch 😥
                    </CommandEmpty>
                  )
                ) : (
                  <CommandItem>
                    <Skeleton className="h-8 w-full" />
                  </CommandItem>
                )}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CustomComboboxCategory;
