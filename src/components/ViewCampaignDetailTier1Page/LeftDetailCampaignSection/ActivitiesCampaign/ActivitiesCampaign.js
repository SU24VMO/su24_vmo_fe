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
import { Button } from "../../../ui/button";

const ActivitiesCampaign = ({ activities }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState("10em");
  const contentRef = React.useRef(null);
  // Khởi tạo state với mỗi activityId là key và link ảnh đầu tiên là giá trị
  // Để khởi tạo, chúng ta sử dụng `activities.reduce()` để tạo ra object này từ mảng `activities`.
  // Với mỗi `activity`, chúng ta sử dụng `activityId` làm key.
  // Giá trị ban đầu cho mỗi key là link của ảnh đầu tiên trong mảng `activityImages` của `activity` đó,
  // hoặc là `img_demo` nếu `activityImages[0]?.link` không tồn tại (sử dụng optional chaining `?.` và logical OR `||`).
  const [selectedImages, setSelectedImages] = React.useState(
    activities.reduce((acc, activity) => {
      acc[activity.activityId] = activity.activityImages[0]?.link || img_demo;
      return acc;
    }, {})
  );

  // Hàm để cập nhật ảnh được chọn
  const handleSelectImage = (activityId, imageLink) => {
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [activityId]: imageLink,
    }));
  };

  const toggleContent = () => {
    if (isExpanded) {
      setMaxHeight("10em"); // Đặt lại về giá trị ban đầu khi thu gọn
    } else {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // Cập nhật maxHeight dựa trên độ cao thực tế của nội dung
    }
    setIsExpanded(!isExpanded);
  };

  const contentStyle = {
    maxHeight: maxHeight,
    overflow: "hidden",
    position: "relative",
    transition: "max-height 0.5s ease",
    ...(isExpanded
      ? {}
      : {
          // Khi chưa mở rộng, thêm bóng mờ ở cuối
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }),
  };

  React.useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [isExpanded]); // Cập nhật maxHeight khi campaignDescription thay đổi

  return (
    <div>
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Badge size={48} />
          <p className="text-muted-foreground">Không có hoạt động nào</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {activities.map((activity, index) => {
            return (
              <Card
                key={activity.activityId}
                className="flex flex-col space-y-4"
              >
                {activity.isActive ? (
                  <>
                    <CardHeader>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription>
                        Đã đăng vào{" "}
                        {format(
                          new Date(activity.createDate),
                          "yyyy-MM-dd HH:mm a"
                        )}
                        <div
                          ref={contentRef}
                          style={contentStyle}
                          className="text-black my-3"
                          dangerouslySetInnerHTML={{
                            __html: activity.content.replace(
                              /(?:\r\n|\r|\n)/g,
                              "<br>"
                            ),
                          }}
                        />
                        <Button
                          size={"lg"}
                          variant={"link"}
                          onClick={toggleContent}
                          className="p-0"
                        >
                          {isExpanded ? "Thu gọn" : "Xem thêm"}
                        </Button>
                      </CardDescription>
                    </CardHeader>
                    <div className="">
                      <div className="">
                        <CardContent>
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={selectedImages[activity.activityId]}
                                alt="Actitvity Image"
                                className="w-full h-full rounded-md object-cover"
                              />
                            </AspectRatio>
                            <div className="flex flex-col items-center justify-center">
                              <Carousel>
                                <CarouselContent className="-ml-1 max-w-[378px] transactionTable:max-w-full">
                                  {activity.activityImages.map(
                                    (img, imgIndex) => (
                                      <CarouselItem
                                        key={img.activityImageId}
                                        onClick={() =>
                                          handleSelectImage(
                                            activity.activityId,
                                            img.link
                                          )
                                        }
                                        className="basis-1/3"
                                      >
                                        <div
                                          className={`w-full h-full overflow-hidden ${
                                            selectedImages[
                                              activity.activityId
                                            ] === img.link
                                              ? "border-2 border-green-400 border-solid rounded-md"
                                              : ""
                                          }`}
                                        >
                                          <img
                                            src={img.link}
                                            alt={`Activity Image ${
                                              imgIndex + 1
                                            }`}
                                            className={
                                              "w-full h-full rounded-md object-cover"
                                            }
                                          />
                                        </div>
                                      </CarouselItem>
                                    )
                                  )}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivitiesCampaign;
