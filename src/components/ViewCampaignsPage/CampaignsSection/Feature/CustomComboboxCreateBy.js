import React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";

const data = [
  {
    value: "organization",
    label: "Tổ chức",
  },
  {
    value: "volunteer",
    label: "Cá nhân",
  },
];

const CustomComboboxCreateBy = ({ setSelectedCampaignCreateBy }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
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
              ? data.find((item) => item.value === value)?.label
              : "Chiến dịch được tạo bởi"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            {/* <CommandInput placeholder="Tìm kiếm danh mục..." /> */}
            {/* <CommandEmpty>Không tìm được danh mục chiến dịch 😥</CommandEmpty> */}
            <CommandGroup>
              <CommandList>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setSelectedCampaignCreateBy(
                        currentValue === value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CustomComboboxCreateBy;
