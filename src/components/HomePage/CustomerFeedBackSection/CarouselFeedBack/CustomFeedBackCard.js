import { Card, CardContent } from "../../../ui/card";
import React from "react";

const CustomFeedBackCard = ({ avatar, name, category, message }) => {
  return (
    <>
      <Card className="cursor-pointer rounded-2xl">
        <CardContent className="flex flex-col aspect-square justify-start p-6 overflow-hidden">
          <div className="flex items-center mb-2">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mr-2"
            />
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-gray-500">{category}</p>
            </div>
          </div>
          <p className="text-base">{message}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomFeedBackCard;
