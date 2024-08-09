import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { BadgeCheck, Clock4, MapPin, Target } from "lucide-react";
import { Separator } from "../../../ui/separator";
import { Button } from "../../../ui/button";
import { Skeleton } from "../../../ui/skeleton";

const RightDetailCampaignSkeleton = () => {
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
      <Card className="mb-3">
        <CardHeader>
          <div className="flex items-center gap-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardDescription>Tiền ủng hộ sẽ được chuyển đến</CardDescription>
              <div className="flex gap-x-3">
                <CardTitle>
                  <Skeleton className="bg-gray-200 w-40 h-6" />
                </CardTitle>
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardHeader className="flex items-center justify-center">
          <div className="bg-white w-full">
            <div className="w-full flex items-center justify-between mt-3 space-x-3">
              <Skeleton className="bg-gray-200 h-10 w-10 rounded-full" />
              <Skeleton className="bg-gray-200 w-full h-3 " />
            </div>
            <div className="w-full flex items-center mt-3 space-x-3">
              <Skeleton className="bg-gray-200 h-10 w-10 rounded-full" />
              <Skeleton className="bg-gray-200 w-full h-3 " />
            </div>
            <div className="w-full flex items-center mt-3 space-x-3">
              <Skeleton className="bg-gray-200 h-10 w-10 rounded-full" />
              <Skeleton className="bg-gray-200 w-full h-3 " />
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col justify-center items-center py-6">
          <div className="flex w-full items-center justify-between">
            {/* Mục tiêu chiến dịch */}
            <div className="flex items-center justify-center gap-x-3">
              <Target className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Mục tiêu chiến dịch</p>
                <Skeleton className="bg-gray-200 w-30 h-6" />
              </div>
            </div>
            {/* Thời gian còn lại */}
            <div className="flex items-center justify-center gap-x-3">
              <Clock4 className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Thời gian còn lại</p>
                <Skeleton className="bg-gray-200 w-20 h-6" />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 my-5">
            <MapPin className="h-6 w-6" />
            <Skeleton className="bg-gray-200 w-full h-6" />
          </div>
          <div className="bg-white w-full">
            <Skeleton className="bg-gray-200 w-full h-6" />
            <div className="w-full flex justify-between mt-3">
              <Skeleton className="bg-gray-200 w-20 h-6" />
              <Skeleton className="bg-gray-200 w-20 h-6" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center">
            <Button
              variant="green_theme_primary"
              size="lg"
              className="font-bold text-lg"
              disabled={true}
            >
              Ủng hộ
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full mx-auto">
        <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl text-center">
            Top 5 người ủng hộ nhiều nhất <br /> toàn hệ thống
          </CardTitle>
        </CardHeader>
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
      </Card>
    </>
  );
};

export default RightDetailCampaignSkeleton;
