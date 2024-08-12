import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import placeholder_img from "../../../assets/images/placeholder.svg";
import LeftDonateCardContent from "./LeftDonateCardContent";
import img_demo from "../../../assets/images/placeholder.svg";
import { differenceInCalendarDays, parseISO } from "date-fns";

const LeftDonatePage = ({ data }) => {
  // Chuyển đổi expectedEndDate từ string sang Date và tính toán số ngày còn lại
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  // Hàm format số tiền ủng hộ
  const formatAmount = (value) => {
    // Remove non-digit characters from the input value
    const cleanValue = value.replace(/\D/g, "");
    // Format the value with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={
                  data.organization
                    ? data.organization.logo
                    : data.member
                    ? data.member.account.avatar
                    : img_demo
                }
              />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardDescription>Tiền ủng hộ sẽ được chuyển đến</CardDescription>
              <div className="flex gap-x-3">
                <CardTitle className="text-lg mobile:text-xl">
                  {data.organization
                    ? data.organization.name
                    : data.member
                    ? data.member.firstName + " " + data.member.lastName
                    : "Không xác định"}
                </CardTitle>
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col justify-center items-center py-6">
          <LeftDonateCardContent
            imgSrc={data ? data.image : placeholder_img}
            amountAchieved={formatAmount(data.donatePhase.currentMoney)}
            amountTarget={formatAmount(data.targetAmount)}
            campaignTitle={data.name}
            dayLeft={calculateDaysLeft(data.expectedEndDate)}
            progressPercent={data.donatePhase.percent}
            totalDonators={data.transactions.length}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default LeftDonatePage;
