import React from "react";
import {
  Card,
  CardContent,
} from "../../ui/card";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Badge } from "../../ui/badge";

const CardCampaign = ({ campaignId, imgSrc, daysLeft, campaignName }) => {
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  return (
    <Link to={`/viewCampaigns/campaignDetail/${campaignId}`}>
      <Card className="cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-0 overflow-hidden">
          <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-full h-full overflow-hidden rounded-md relative">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={imgSrc}
                  alt="Campaign"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="absolute mt-1 ml-1 top-0 left-0 z-10">
                {/* <Badge variant="secondary">{`Còn ${calculateDaysLeft(
                  daysLeft
                )} ngày`}</Badge> */}
              </div>
            </div>
            <div className="bg-white w-full px-6">
              <p className="text-lg font-bold mt-2 mb-4">{campaignName}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardCampaign;
