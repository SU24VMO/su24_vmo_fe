import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../ui/calendar";

const BirthDayPicker = () => {
  const [date, setDate] = React.useState(null);
  const [formattedDate, setFormattedDate] = React.useState(null); // Sử dụng cái state này để  truyền về Backend thay cho date
  const handleSetDate = (date) => {
    setDate(date);
    const formatted = date ? format(date, "yyyy/MM/dd") : null;
    setFormattedDate(formatted);
    console.log(date);
  };
  console.log("Formatted date: ", formattedDate);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", { locale: vi })
            ) : (
              <span>Ngày tháng năm sinh</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            onSelect={handleSetDate}
            captionLayout="dropdown-buttons"
            fromYear={1970}
            toYear={2025}
            showOutsideDays={false}
            selected={date}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default BirthDayPicker;
