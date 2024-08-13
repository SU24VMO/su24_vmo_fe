import { differenceInCalendarDays, format, parseISO } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Badge } from "../../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Button } from "../../ui/button";
import { CalendarDays, TriangleAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import vmo_avatar from "../../../assets/images/512x512.svg";
// import { Progress } from "../../ui/progress";

const CardCampaign = ({
  campaignId,
  imgSrc,
  daysLeft,
  //   campaignCategory,
  campaignName,
  organizerName,
  progressValue,
  achievedAmount,
  phases,
  isTransparent,
  checkTransparentDate,
  campaignTier,
}) => {
  // Chuyển đổi expectedEndDate từ string sang Date và tính toán số ngày còn lại
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  // Logic xác định phase đang isProcessing
  // const processingPhaseName = phases?.find(
  //   (phase) => phase?.isProcessing
  // )?.name;
  //   // Hàm format số tiền ủng hộ
  //   const formatMoney = (money) => {
  //     // Ensure money is a string
  //     const moneyStr = money.toString();
  //     // Remove non-digit characters from the input money
  //     const cleanValue = moneyStr.replace(/\D/g, "");
  //     // Format the money with thousand separators
  //     const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //     return formattedValue;
  //   };

  return (
    <>
      {campaignTier === 1 ? (
        <Link to={`/viewCampaigns/campaignDetail/tier1/${campaignId}`}>
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
                    {isTransparent ? (
                      <Badge variant="success">{`Chiến dịch minh bạch`}</Badge>
                    ) : (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="p-0 w-full rounded-full"
                          >
                            <TriangleAlert /> Chiến dịch này đã bị cấm
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <Avatar>
                              <AvatarImage src={vmo_avatar} />
                              <AvatarFallback>VMO</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">
                                Hệ thống VMO
                              </h4>
                              <p className="text-sm">
                                Chúng tôi nhận thấy rằng các hành động và thông
                                tin trong chiến dịch này không hoàn toàn minh
                                bạch và rõ ràng.
                              </p>
                              <div className="flex items-center pt-2">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                  Đã bị cấm vào{" "}
                                  {format(
                                    new Date(checkTransparentDate),
                                    "dd/MM/yyyy, h:mm:ss a"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </div>
                </div>
                <div className="bg-white w-full px-6">
                  <Badge variant="outline">
                    Chiến dịch giải ngân toàn phần
                  </Badge>
                  <p className="text-sm mobile:text-lg font-bold mt-2 mb-4">
                    {campaignName}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Link to={`/viewCampaigns/campaignDetail/tier2/${campaignId}`}>
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
                    {isTransparent ? (
                      <Badge variant="success">{`Chiến dịch minh bạch`}</Badge>
                    ) : (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="p-0 w-full rounded-full"
                          >
                            <TriangleAlert /> Chiến dịch này đã bị cấm
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between space-x-4">
                            <Avatar>
                              <AvatarImage src={vmo_avatar} />
                              <AvatarFallback>VMO</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">
                                Hệ thống VMO
                              </h4>
                              <p className="text-sm">
                                Chúng tôi nhận thấy rằng các hành động và thông
                                tin trong chiến dịch này không hoàn toàn minh
                                bạch và rõ ràng.
                              </p>
                              <div className="flex items-center pt-2">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                  Đã bị cấm vào{" "}
                                  {format(
                                    new Date(checkTransparentDate),
                                    "dd/MM/yyyy, h:mm:ss a"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </div>
                </div>
                <div className="bg-white w-full px-6">
                  <Badge variant="outline">
                    Chiến dịch giải ngân từng phần
                  </Badge>
                  <p className="text-sm mobile:text-lg font-bold mt-2 mb-4">
                    {campaignName}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </>
  );
};

export default CardCampaign;
