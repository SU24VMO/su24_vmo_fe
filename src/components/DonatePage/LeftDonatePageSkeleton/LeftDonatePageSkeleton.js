import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import img_demo from "../../../assets/images/placeholder.svg";
import { BadgeCheck } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { Skeleton } from "../../ui/skeleton";

const LeftDonatePageSkeleton = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={img_demo} />
              <AvatarFallback>Bi</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardDescription>Tiền ủng hộ sẽ được chuyển đến</CardDescription>
              <div className="flex gap-x-3">
                <CardTitle>
                    <Skeleton className="h-6 w-40 rounded-full" />
                </CardTitle>
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col justify-center items-center py-6">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-full">
              {/* <img
                src={imgSrc}
                alt="Campaign"
                className="w-full h-full object-cover"
              /> */}
              <Skeleton className="w-full h-96" />
              <div className="absolute mt-1 ml-1 top-0 left-0">
                {/* <Badge variant="white">{`Còn ${dayLeft} ngày`}</Badge> */}
                <Skeleton className="bg-gray-200 h-4 w-20 rounded-full" />
              </div>
            </div>
            <div className="bg-white w-full px-6">
              {/* <p className="text-lg font-bold mt-2 mb-4">{campaignTitle}</p> */}
              <Skeleton className="h-6 w-40 rounded-full mt-2 mb-4" />
              <div className="w-full flex justify-between">
                {/* <p className="mb-2">
                  Đã đạt được <b className="text-lg">{amountAchieved} VND</b>
                </p> */}
                <Skeleton className="h-6 w-40 rounded-full mb-2" />
                {/* <p className="text-muted-foreground">{progressPercent}%</p> */}
                <Skeleton className="h-6 w-20 rounded-full mb-2" />
              </div>
              {/* <Progress
                value={progressPercent}
                className="w-full bg-[#e9ecef] mb-2"
              /> */}
              <Skeleton className="h-6 w-full bg-gray-200 mb-2 rounded-full" />
              <div className="w-full flex justify-between">
                {/* <p className="mb-2">Của mục tiêu {amountTarget} VND</p> */}
                <Skeleton className="h-6 w-40 rounded-full mb-2" />
                {/* <p className="text-muted-foreground">
                  {totalDonators} người đã ủng hộ
                </p> */}
                <Skeleton className="h-6 w-20 rounded-full mb-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LeftDonatePageSkeleton;
