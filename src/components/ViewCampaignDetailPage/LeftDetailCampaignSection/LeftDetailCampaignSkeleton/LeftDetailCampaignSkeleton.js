import React from "react";
import { Card } from "../../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { Skeleton } from "../../../ui/skeleton";
import { AspectRatio } from "../../../ui/aspect-ratio";

const LeftDetailCampaignSkeleton = () => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
            <Skeleton className="w-1/2 h-8" />
          <Card className=" max-h-[600px] overflow-hidden flex flex-col items-stretch justify-center">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </div>
          </Card>
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">
                <Skeleton className="w-24 h-4" />
              </TabsTrigger>
              <TabsTrigger value="transaction">
                <Skeleton className="w-24 h-4" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="leading-relaxed">
              <div className="space-y-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </TabsContent>
            <TabsContent value="transaction">
              <div className="space-y-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default LeftDetailCampaignSkeleton;
