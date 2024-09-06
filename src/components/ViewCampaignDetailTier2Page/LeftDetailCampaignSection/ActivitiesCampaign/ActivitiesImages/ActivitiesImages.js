/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { AspectRatio } from "../../../../ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../ui/card";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "../../../../ui/tabs";

const ActivitiesImages = ({
  activity,
  selectedImages,
  handleMouseEnter,
  handleMouseLeave,
  handleDownload,
  handleSelectImage,
  isHovered,
  cardRef,
  onCardHeightChange,
}) => {
  const resizeObserverRef = React.useRef(null);

  React.useEffect(() => {
    if (cardRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (let entry of entries) {
          onCardHeightChange(entry.contentRect.height);
        }
      });
      resizeObserverRef.current.observe(cardRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [cardRef, onCardHeightChange]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs defaultValue="activities" className="flex items-center">
        <TabsList>
          <TabsTrigger value="activities">Hoạt động</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="flex flex-col space-y-4 max-w-lg" ref={cardRef}>
        {activity.isActive ? (
          <>
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
              <CardDescription>
                Đã đăng vào{" "}
                {format(new Date(activity.createDate), "yyyy-MM-dd HH:mm a")}
                <div
                  className="text-black my-3"
                  dangerouslySetInnerHTML={{
                    __html: activity.content.replace(/(?:\r\n|\r|\n)/g, "<br>"),
                  }}
                />
              </CardDescription>
            </CardHeader>
            <div className="">
              <div className="">
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <AspectRatio
                      ratio={16 / 9}
                      className="border bg-card rounded-lg shadow-sm"
                    >
                      <div
                        className="relative w-full h-full"
                        onMouseEnter={() =>
                          handleMouseEnter(activity.activityId)
                        }
                        onMouseLeave={() =>
                          handleMouseLeave(activity.activityId)
                        }
                      >
                        <img
                          src={selectedImages[activity.activityId]}
                          alt="Activity Image"
                          className="w-full h-full rounded-lg shadow-md object-cover"
                        />
                        {isHovered[activity.activityId] && (
                          <button
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-md"
                            onClick={() =>
                              handleDownload(
                                selectedImages[activity.activityId]
                              )
                            }
                          >
                            Tải về
                          </button>
                        )}
                      </div>
                    </AspectRatio>
                    <div className="flex flex-col items-center justify-center">
                      <Carousel className="shadow-inner">
                        <CarouselContent className="-ml-1 max-w-[378px] transactionTable:max-w-full">
                          {activity.activityImages.map((img, imgIndex) => (
                            <CarouselItem
                              key={img.activityImageId}
                              onClick={() =>
                                handleSelectImage(activity.activityId, img.link)
                              }
                              className="basis-1/3"
                            >
                              <div
                                className={`w-full h-full overflow-hidden ${
                                  selectedImages[activity.activityId] ===
                                  img.link
                                    ? "border-2 border-green-400 border-solid rounded-md"
                                    : ""
                                }`}
                              >
                                <img
                                  src={img.link}
                                  alt={`Activity Image ${imgIndex + 1}`}
                                  className="w-full h-full rounded-lg shadow-md object-cover"
                                />
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
          </>
        ) : (
          <CardContent>
            <div className="text-center text-gray-500 mt-5">
              Hoạt động đang chờ được duyệt
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ActivitiesImages;
