import React, { useState, useEffect } from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";

export function CopyButton({ event, name, code, ...props }) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 rounded-[6px] [&_svg]:size-3.5"
            onClick={() => {
              navigator.clipboard.writeText(code);
              // trackEvent({
              //   name: event,
              //   properties: {
              //     name,
              //   },
              // });
              setHasCopied(true);
            }}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Sao chép nội dung</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
