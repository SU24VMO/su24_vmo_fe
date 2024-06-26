import { Card, CardContent } from "../../../ui/card";
import { Skeleton } from "../../../ui/skeleton";
import React from "react";

const CampaignsSectionSkeleton = () => {
  return (
    <Card className="cursor-pointer">
      <CardContent className="flex flex-col aspect-square items-center justify-center p-0 overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full h-full">
            <Skeleton className="w-full h-full" />
            <div className="absolute mt-1 ml-1 top-0 left-0">
              <Skeleton className="w-20 h-6 bg-gray-200" />
            </div>
          </div>
          <div className="bg-white w-full px-6">
            <div className="text-lg font-bold mt-2 mb-4">
              <Skeleton className="w-40 h-6" />
            </div>
            <div className="text-lg mb-2">
              <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="w-full h-6 mb-2" />
            <div className="w-full flex justify-between">
              <div className="text-lg mb-2">
                <Skeleton className="w-20 h-6" />
              </div>
              <div className="text-muted-foreground">
                <Skeleton className="w-10 h-6" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignsSectionSkeleton;
