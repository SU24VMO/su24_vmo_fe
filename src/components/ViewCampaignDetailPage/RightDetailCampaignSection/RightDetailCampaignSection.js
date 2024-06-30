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

const RightDetailCampaignSection = () => {
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
          <div className="flex w-full items-center justify-between">
            {/* Mục tiêu chiến dịch */}
            <div className="flex items-center justify-center gap-x-3">
              <Target className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Mục tiêu chiến dịch</p>
                <p className="font-bold">1.000.000 VND</p>
              </div>
            </div>
            {/* Thời gian còn lại */}
            <div className="flex items-center justify-center gap-x-3">
              <Clock4 className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Thời gian còn lại</p>
                <p className="font-bold">123 ngày</p>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 my-5">
            <MapPin className="h-6 w-6" />
            <p>39-41 Đường Lê Thạch,Phường 12,Quận 4,Thành phố Hồ Chí Minh</p>
          </div>
          <div className="bg-white w-full">
            <Progress value={30} className="w-full bg-[#e9ecef] mb-2" />
            <div className="w-full flex justify-between">
              <p className="text-lg mb-2">
                Đã đạt được <b>30.000.000 VND</b>
              </p>
              <p className="text-muted-foreground">30%</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center">
            <Button variant="default" size="lg" className="font-bold text-lg">
              Ủng hộ
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RightDetailCampaignSection;
