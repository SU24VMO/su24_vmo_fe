import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { BadgeCheck, Target, Clock4, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import avatar_img from "../../../assets/avatars/02.png";
import { Progress } from "../../ui/progress";
import { Button } from "../../ui/button";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { Badge } from "../../ui/badge";

const RightDetailCampaignSection = ({ data }) => {
  // Chuyển đổi expectedEndDate từ string sang Date và tính toán số ngày còn lại
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  // Hàm format số tiền ủng hộ
  const targetAmountFormat = (targetAmount) => {
    // Remove non-digit characters from the input targetAmount
    const cleanValue = targetAmount.replace(/\D/g, "");
    // Format the targetAmount with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={
                  data.organization
                    ? data.organization.logo
                    : data.member
                    ? data.member.logo
                    : avatar_img
                }
              />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardDescription>Tiền ủng hộ sẽ được chuyển đến</CardDescription>
              <div className="flex gap-x-3">
                <CardTitle className="text-xl mobile:text-2xl">
                  {data.organization
                    ? data.organization.name
                    : data.member
                    ? data.member.name
                    : "Không xác định"}
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
                <p className="font-bold">
                  {targetAmountFormat(data.targetAmount)} VND
                </p>
              </div>
            </div>
            {/* Thời gian còn lại */}
            <div className="flex items-center justify-center gap-x-3">
              <Clock4 className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Thời gian còn lại</p>
                <p className="font-bold">
                  {calculateDaysLeft(data.expectedEndDate)} ngày
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 my-5">
            <MapPin className="h-6 w-6" />
            <p>{data.address}</p>
          </div>
          {data.donatePhase.isProcessing ? (
            <>
              <div className="bg-white w-full space-y-3">
                <Badge variant="default">{data.donatePhase.name}</Badge>
                <Progress
                  value={data.donatePhase.percent}
                  className="w-full bg-[#e9ecef] mb-2"
                />
                <div className="w-full flex justify-between">
                  <p className="text-lg mb-2">
                    Đã đạt được <b>30.000.000 VND</b>
                  </p>
                  <p className="text-muted-foreground">30%</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>{data.donatePhase.name} đã kết thúc!</p>
            </>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center">
            {data.donatePhase.isProcessing ? (
              <Button variant="default" size="lg" className="font-bold text-lg">
                Ủng hộ
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="font-bold text-lg"
                disabled={true}
              >
                Ủng hộ
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RightDetailCampaignSection;
