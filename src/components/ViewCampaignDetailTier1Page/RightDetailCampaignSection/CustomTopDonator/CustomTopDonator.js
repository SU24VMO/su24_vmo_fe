import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

const CustomTopDonator = () => {
  const topDonator = [
    { name: "Nguyen Van A", amount: "100.000VND" },
    { name: "Nguyen Van B", amount: "90.000VND" },
    { name: "Nguyen Van C", amount: "80.000VND" },
    { name: "Nguyen Van D", amount: "70.000VND" },
    { name: "Nguyen Van E", amount: "60.000VND" },
  ];

  const getAvatarStyle = (index) => {
    switch (index) {
      case 0:
        return "w-12 h-12 border-2 border-yellow-300";
      case 1:
        return "w-12 h-12 border-2 border-gray-500";
      case 2:
        return "w-12 h-12 border-2 border-yellow-600";
      default:
        return "w-12 h-12";
    }
  };

  const getBadgeStyle = (index) => {
    switch (index) {
      case 0:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-200 text-yellow-500 font-bold px-2 py-1 rounded-full text-xs";
      case 1:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-primary-foreground font-bold px-2 py-1 rounded-full text-xs";
      case 2:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-primary-foreground font-bold px-2 py-1 rounded-full text-xs";
      default:
        return "";
    }
  };
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">Top 5 người ủng hộ nhiều nhất</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 justify-center">
          {topDonator.map((donator, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative">
                <Avatar className={getAvatarStyle(index)}>
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt={`@${donator.name}`}
                  />
                  <AvatarFallback>{index + 1}</AvatarFallback>
                </Avatar>
                {index < 3 && (
                  <div className={getBadgeStyle(index)}>{index + 1}</div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{donator.name}</div>
                <div className="text-sm text-muted-foreground">
                  Đã ủng hộ {donator.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomTopDonator;
