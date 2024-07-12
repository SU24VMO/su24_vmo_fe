import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../ui/avatar";
import { Card, CardContent } from "../../../../ui/card";
import { CarouselItem } from "../../../../ui/carousel";
import place_holder from "../../../../../assets/images/placeholder.svg";
import { Skeleton } from "../../../../ui/skeleton";

const CarouselDonatorSkeleton = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <CarouselItem key={index} className="pt-1 md:basis-1/2">
      <div className="p-1">
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col mobile:flex-row w-full items-center justify-around p-6">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-1">
                <AvatarImage src={place_holder} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              {/* <p className="font-bold text-[10px] mobile:text-base">{name}</p> */}
                <Skeleton className="w-20 h-3" />
            </div>
            <div className="flex items-center gap-x-3 my-2 mobile:my-0">
              {/* <p className="font-normal text-[10px] mobile:text-xs">Vừa ủng hộ</p> */}
                <Skeleton className="w-20 h-3" />
              {/* <p className="font-bold text-[10px] mobile:text-xs">{donation}</p> */}
                <Skeleton className="w-20 h-3" />
            </div>
            {/* <p className="text-muted-foreground text-[10px] mobile:text-xs">{time}</p> */}
            <Skeleton className="w-20 h-3" />
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ));
};

export default CarouselDonatorSkeleton;
