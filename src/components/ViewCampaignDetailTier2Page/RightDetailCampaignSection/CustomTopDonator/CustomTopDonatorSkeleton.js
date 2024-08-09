import React from "react";
import { Skeleton } from "../../../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

const CustomTopDonatorSkeleton = () => {
  const topDonorsSkeleton = [1, 2, 3, 4, 5];
  
  const getAvatarStyle = (index) => {
    switch (index) {
      case 0:
        return "h-12 w-12 rounded-full border-2 border-yellow-300";
      case 1:
        return "h-12 w-12 rounded-full border-2 border-gray-500";
      case 2:
        return "h-12 w-12 rounded-full border-2 border-yellow-600";
      default:
        return "h-12 w-12 rounded-full";
    }
  };

  const getBadgeStyle = (index) => {
    switch (index) {
      case 0:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-200 text-yellow-500 font-bold px-2 py-1 rounded-full text-xs";
      case 1:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-primary-foreground font-bold px-2 py-1 rounded-full text-xs";
      case 2:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-primary-foreground font-bold px-2 py-1 rounded-full text-xs";
      default:
        return "";
    }
  };
  return (
    <>
      <CardContent>
        <div className="grid gap-4 justify-center">
          {topDonorsSkeleton.map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative">
                <Skeleton className={getAvatarStyle(index)} />
                {index < 3 && (
                  <div className={getBadgeStyle(index)}>{index + 1}</div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
};

export default CustomTopDonatorSkeleton;
