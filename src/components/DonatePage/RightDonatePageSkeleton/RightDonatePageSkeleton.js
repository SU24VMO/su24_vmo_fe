import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";

const RightDonatePageSkeleton = () => {
  return (
    <div className="flex flex-col space-y-20 p-5">
      {/* Skeleton for Title */}
      <Skeleton className="h-6 w-1/2" />
      {/* Skeleton for Money Donate Input and Buttons */}
      <div>
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <div className="flex justify-between space-x-10">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
        </div>
      </div>
      {/* Skeleton for Wish Input */}
      <div>
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
      </div>
      {/* Skeleton for User Information */}
      <Skeleton className="h-6 w-1/2 " />
      <div>
        <Skeleton className="h-6 w-1/2 mb-2" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 " />
          </div>
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 mb-2" />
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </div>
        <div>
          <Skeleton className="h-4 w-1/4 mb-2 mt-8" />
        </div>
        <Button
          variant="default"
          size="lg"
          className="font-bold text-lg w-full"
          disabled={true}
        >
          Ủng hộ
        </Button>
      </div>
    </div>
  );
};

export default RightDonatePageSkeleton;
