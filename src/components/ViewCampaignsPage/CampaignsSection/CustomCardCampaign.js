import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import React from "react";
import { AspectRatio } from "../../ui/aspect-ratio";

const CustomCardCampaign = ({
  imgSrc,
  daysLeft,
  campaignName,
  organizerName,
  progressValue,
  achievedAmount,
}) => {
  return (
    <>
      <Card className="cursor-pointer">
        <CardContent className="flex flex-col aspect-square items-center justify-center p-0 overflow-hidden">
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-full overflow-hidden rounded-md relative">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={imgSrc}
                  alt="Campaign"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="absolute mt-1 ml-1 top-0 left-0 z-50">
                <Badge variant="secondary">{`Còn ${daysLeft} ngày`}</Badge>
              </div>
            </div>
            <div className="bg-white w-full px-6">
              <p className="text-lg font-bold mt-2 mb-4">{campaignName}</p>
              <p className="text-lg mb-2">
                Tạo bởi <b>{organizerName}</b>
              </p>
              <Progress
                value={progressValue}
                className="w-full bg-[#e9ecef] mb-2"
              />
              <div className="w-full flex justify-between">
                <p className="text-lg mb-2">
                  Đã đạt được <b>{achievedAmount}</b>
                </p>
                <p className="text-muted-foreground">{`${progressValue}%`}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomCardCampaign;
