import React from 'react';
import { Card, CardContent } from "../../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";

const CustomCardDonator = ({ avatar_img, name, donation, time }) => {
  return (
    <Card className="rounded-3xl">
      <CardContent className="flex w-full items-center justify-around p-6">
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-1">
            <AvatarImage src={avatar_img} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="font-bold">{name}</p>
        </div>
        <div className="flex items-center gap-x-3">
          <p className="font-normal text-xs">Vừa ủng hộ</p>
          <p className="font-bold text-xs">{donation}</p>
        </div>
        <p className="text-muted-foreground text-xs">{time}</p>
      </CardContent>
    </Card>
  );
};

export default CustomCardDonator;