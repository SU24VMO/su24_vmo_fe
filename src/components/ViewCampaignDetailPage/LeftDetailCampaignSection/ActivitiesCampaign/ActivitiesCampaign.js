/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { AspectRatio } from "../../../ui/aspect-ratio";
import { Badge } from "../../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import img_demo from "../../../../assets/images/placeholder.svg";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";

const ActivitiesCampaign = ({ activities }) => {
  return (
    <div>
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Badge size={48} />
          <p className="text-muted-foreground">Không có hoạt động nào</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {activities.map((activity, index) => (
            <Card key={activity.activityId} className="flex flex-col space-y-4">
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription>
                  Đã đăng vào{" "}
                  {format(new Date(activity.createDate), "yyyy-MM-dd HH:mm a")}
                  <span className="text-black my-3 block">
                    {activity.content}
                  </span>
                </CardDescription>
              </CardHeader>
              <div className="">
                <div className="">
                  <CardContent>
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={activities.image ? activities.image : img_demo}
                          alt="Actitvity Image"
                          className="w-full h-full rounded-md object-cover"
                        />
                      </AspectRatio>
                      <div className="flex flex-col items-center justify-center">
                        <Carousel>
                          <CarouselContent className="-ml-1 max-w-[378px] transactionTable:max-w-full">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <CarouselItem
                                key={index}
                                className="basis-1/3"
                              >
                                <div className="cursor-pointer">
                                  <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-3 mobile:p-6 overflow-hidden">
                                      <div className="overflow-hidden rounded-md">
                                        <img
                                          src={img_demo}
                                          alt="Featured Image"
                                          width={400}
                                          height={400}
                                          className="aspect-[4/4] h-full w-full rounded-md object-cover"
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <div className="flex items-center justify-center mt-3">
                            <CarouselPrevious className="static transform-none" />
                            <CarouselNext className="static transform-none" />
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesCampaign;
