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
import avatar_img from "../../../../assets/avatars/02.png";
import { BadgeCheck, Clock4, MapPin, Target } from "lucide-react";
import { Separator } from "../../../ui/separator";
import { Progress } from "../../../ui/progress";
import { Button } from "../../../ui/button";
import { Skeleton } from "../../../ui/skeleton";

const RightDetailCampaignSkeleton = () => {
  return (
    <>
      <Card>
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
              variant="default"
              size="lg"
              className="font-bold text-lg"
              disabled={true}
            >
              Ủng hộ
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RightDetailCampaignSkeleton;
