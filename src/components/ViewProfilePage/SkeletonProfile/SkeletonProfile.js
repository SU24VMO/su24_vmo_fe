import React from "react";
import { Skeleton } from "../../ui/skeleton";

const SkeletonProfile = () => {
  return (
    <div className="grid gap-6 tablet:grid-cols-2 bg-vmo rounded-xl p-10 drop-shadow-lg ">
      <div className="justify-center mobile:justify-evenly mobile:flex gap-4 items-center">
        <div className="rounded-full flex justify-center">
          <Skeleton className="h-36 w-36 rounded-full" />
        </div>
        <div className="flex justify-center">
          <div>
            <Skeleton className="h-6 w-[150px] my-2" />
            <Skeleton className="h-6 w-[100px] my-2" />
          </div>
        </div>
      </div>
      <div className="mobile:flex justify-around gap-4 items-center">
        <div className="text-center">
          <Skeleton className="h-6 w-24 mx-auto my-2" />
          <Skeleton className="h-4 w-16 mx-auto my-2" />
        </div>
        <div className="text-center">
          <Skeleton className="h-6 w-24 mx-auto my-2" />
          <Skeleton className="h-4 w-16 mx-auto my-2" />
        </div>
        <div className="text-center">
          <Skeleton className="h-6 w-24 mx-auto my-2" />
          <Skeleton className="h-4 w-16 mx-auto my-2" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
