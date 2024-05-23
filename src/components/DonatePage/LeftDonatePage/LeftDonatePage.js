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
import placeholder_img from "../../../assets/images/placeholder.svg";
import { Badge } from "../../ui/badge";
import LeftDonateCardContent from "./LeftDonateCardContent";

const LeftDonatePage = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar_img} />
              <AvatarFallback>Bi</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardDescription>Tiền ủng hộ sẽ được chuyển đến</CardDescription>
              <div className="flex gap-x-3">
                <CardTitle>Tên Tài Khoản</CardTitle>
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col justify-center items-center py-6">
          <LeftDonateCardContent
            imgSrc={placeholder_img}
            amountAchieved={"1.000.000"}
            amountTarget={"5.000.000"}
            campaignTitle={"Tên Chiến dịch"}
            dayLeft={"000"}
            progressPercent={20}
            totalDonators={100}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default LeftDonatePage;
