import React from "react";
import { Skeleton } from "../../ui/skeleton";

const ViewNewsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-6 xl:gap-8 my-5">
      <Skeleton className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:h-80">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-300 via-transparent to-transparent text-end mt-3">
          <Skeleton className="bg-gray-300 text-sm font-medium me-2 px-2 py-1 rounded h-5 w-16 inline-block"></Skeleton>
        </div>
        <Skeleton className="relative ml-4 mb-3 inline-block text-base font-bold text-white tablet:ml-5 tablet:text-lg break-words w-3/4 h-10"></Skeleton>
      </Skeleton>

      <Skeleton className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:col-span-2 tablet:h-80">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-300 via-transparent to-transparent text-end mt-3">
          <Skeleton className="bg-gray-300 text-sm font-medium me-2 px-2 py-1 rounded h-5 w-16 inline-block"></Skeleton>
        </div>
        <Skeleton className="relative ml-4 mb-3 inline-block text-base font-bold text-white tablet:ml-5 tablet:text-lg break-words w-3/4 h-10"></Skeleton>
      </Skeleton>

       <Skeleton className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:col-span-2 tablet:h-80">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-300 via-transparent to-transparent text-end mt-3">
          <Skeleton className="bg-gray-300 text-sm font-medium me-2 px-2 py-1 rounded h-5 w-16 inline-block"></Skeleton>
        </div>
        <Skeleton className="relative ml-4 mb-3 inline-block text-base font-bold text-white tablet:ml-5 tablet:text-lg break-words w-3/4 h-10"></Skeleton>
      </Skeleton>

      <Skeleton className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:h-80">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-300 via-transparent to-transparent text-end mt-3">
          <Skeleton className="bg-gray-300 text-sm font-medium me-2 px-2 py-1 rounded h-5 w-16 inline-block"></Skeleton>
        </div>
        <Skeleton className="relative ml-4 mb-3 inline-block text-base font-bold text-white tablet:ml-5 tablet:text-lg break-words w-3/4 h-10"></Skeleton>
      </Skeleton>
    </div>
  );
};

export default ViewNewsSkeleton;
