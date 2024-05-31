import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../ui/calendar";

const StartDayPicker = React.memo(({ setStartFieldValue, popOverTriggerIdStart }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [formattedDate, setFormattedDate] = React.useState(null);

  const handleSetDate = (date) => {
    setStartDate(date);
    const formatted = date ? format(date, "yyyy/MM/dd") : null;
    setFormattedDate(formatted);
    setStartFieldValue("startDate", formatted);
    console.log(date);
  };

  console.log("Formatted date: ", formattedDate);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild id={popOverTriggerIdStart}>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? (
              format(startDate, "PPP", { locale: vi })
            ) : (
              <span>Bắt đầu ngày...</span>
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
            selected={startDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
});

export default StartDayPicker;
