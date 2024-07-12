import React from 'react';
import { Card, CardContent } from "../../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";

const CustomCardDonator = ({ avatar_img, name, donation, time }) => {
  // Hàm format số tiền ủng hộ
  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };
  return (
    <Card className="rounded-3xl">
      <CardContent className="flex flex-col mobile:flex-row w-full items-center justify-around p-6">
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            <AvatarImage src={avatar_img} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="font-bold text-[10px] mobile:text-sm">{name}</p>
        </div>
        <div className="flex items-center gap-x-3">
          <p className="font-normal text-[10px] mobile:text-xs min-w-[62px]">Vừa ủng hộ</p>
          <p className="font-bold text-[10px] mobile:text-xs min-w-[70px]">{formatMoney(donation)} VNĐ</p>
        </div>
        <p className="text-muted-foreground text-[10px] mobile:text-xs min-w-[70px]">{time}</p>
      </CardContent>
    </Card>
  );
};

export default CustomCardDonator;