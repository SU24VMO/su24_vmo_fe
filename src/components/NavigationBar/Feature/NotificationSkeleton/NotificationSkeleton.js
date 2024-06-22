import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../../ui/dropdown-menu";
import { Skeleton } from "../../../ui/skeleton";
import React from "react";

const NotificationSkeleton = () => {
  return (
    <div>
      <DropdownMenuItem>
        <div className="flex flex-col w-full">
          <Skeleton className="w-full h-4" />
          <div className="flex justify-between mt-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className="flex flex-col w-full">
          <Skeleton className="w-full h-4" />
          <div className="flex justify-between mt-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className="flex flex-col w-full">
          <Skeleton className="w-full h-4" />
          <div className="flex justify-between mt-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </div>
  );
};

export default NotificationSkeleton;
