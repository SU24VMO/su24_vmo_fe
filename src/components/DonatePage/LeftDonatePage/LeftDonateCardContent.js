import React from "react";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";

const LeftDonateCardContent = ({
  imgSrc,
  dayLeft,
  campaignTitle,
  amountAchieved,
  amountTarget,
  progressPercent,
  totalDonators,
}) => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src={imgSrc}
            alt="Campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute mt-1 ml-1 top-0 left-0">
            <Badge variant="white">{`Còn ${dayLeft} ngày`}</Badge>
          </div>
        </div>
        <div className="bg-white w-full px-6">
          <p className="text-lg font-bold mt-2 mb-4">{campaignTitle}</p>
          <div className="w-full flex justify-between">
            <p className="mb-2">
              Đã đạt được <b className="text-lg">{amountAchieved} VND</b>
            </p>
            <p className="text-muted-foreground">{progressPercent}%</p>
          </div>
          <Progress
            value={progressPercent}
            className="w-full bg-[#e9ecef] mb-2"
          />
          <div className="w-full flex justify-between">
            <p className="mb-2">Của mục tiêu {amountTarget} VND</p>
            <p className="text-muted-foreground">
              {totalDonators} người đã ủng hộ
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftDonateCardContent;
