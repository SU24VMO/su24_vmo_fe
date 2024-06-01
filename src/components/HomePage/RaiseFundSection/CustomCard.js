import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const CustomCard = ({ title, content, Icon }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-4 flex-col items-center gap-4">
        <div className="inline-flex justify-center items-center w-[62px] h-[62px]">
          <Icon className="flex-shrink-0 mobile:w-10 mobile:h-10 h-8 w-8 text-black" />
        </div>
        <CardTitle className="text-base mobile:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center mobile:text-base text-sm">{content}</CardContent>
    </Card>
  );
};

export default CustomCard;
