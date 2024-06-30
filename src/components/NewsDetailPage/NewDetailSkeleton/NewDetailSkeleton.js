import React from "react";
import { Skeleton } from "../../ui/skeleton";

const NewDetailSkeleton = () => {
  return (
    <div className="w-4/5 mx-auto ">
      <Skeleton className="bg-gray-100 w-full h-48 tablet:h-96 flex justify-center rounded-xl bg-cover bg-no-repeat"></Skeleton>
      <div>
        <Skeleton className="bg-gray-200 my-4 w-20 h-4"></Skeleton>
        <Skeleton className="bg-gray-200 w-full h-8 mb-6"></Skeleton>
        <p className="my-3 bg-gray-200 w-full h-24"></p>
        <div className="flex justify-center my-10 w-full">
          <Skeleton className="bg-gray-200 w-[350px] h-[350px]"></Skeleton>
        </div>
        <Skeleton className="bg-gray-200 w-full h-8"></Skeleton>
        <div className="flex justify-end text-end pr-10 my-5">
          <div className="flex-col space-y-3">
            <Skeleton className="w-20 h-4 bg-gray-200"></Skeleton>
            <div className="text-center">
              <Skeleton className="w-40 h-4 bg-gray-200"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDetailSkeleton;
