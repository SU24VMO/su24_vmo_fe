import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import React from "react";
import { AspectRatio } from "../../ui/aspect-ratio";
import { differenceInCalendarDays, parseISO } from "date-fns";

const CustomCardCampaign = ({
  imgSrc,
  daysLeft,
  campaignCategory,
  campaignName,
  organizerName,
  progressValue,
  achievedAmount,
  phases,
}) => {
  // Chuyển đổi expectedEndDate từ string sang Date và tính toán số ngày còn lại
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  // Logic xác định phase đang isProcessing
  const processingPhaseName = phases?.find(
    (phase) => phase?.isProcessing
  )?.name;

  return (
    <>
      <Card className="cursor-pointer">
        <CardContent className="flex flex-col aspect-square items-center justify-center p-0 overflow-hidden">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full h-full overflow-hidden rounded-md relative">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={imgSrc}
                  alt="Campaign"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="absolute mt-1 ml-1 top-0 left-0 z-50">
                <Badge variant="secondary">{`Còn ${calculateDaysLeft(
                  daysLeft
                )} ngày`}</Badge>
              </div>
              <div className="absolute mt-1 mr-1 top-0 right-0 z-50">
                <Badge variant="secondary">{`${campaignCategory}`}</Badge>
              </div>
            </div>
            <div className="bg-white w-full px-6">
              {processingPhaseName && (
                <Badge variant="default">{processingPhaseName}</Badge>
              )}
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
