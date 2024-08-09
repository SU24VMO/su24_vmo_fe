/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { AspectRatio } from "../../../ui/aspect-ratio";
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
import { Step, Stepper } from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";

const ActivitiesCampaign = ({ processingPhases }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState("10em");
  const contentRef = React.useRef(null);
  // Khởi tạo state với mỗi activityId là key và link ảnh đầu tiên là giá trị
  // Để khởi tạo, chúng ta sử dụng `activities.reduce()` để tạo ra object này từ mảng `activities`.
  // Với mỗi `activity`, chúng ta sử dụng `activityId` làm key.
  // Giá trị ban đầu cho mỗi key là link của ảnh đầu tiên trong mảng `activityImages` của `activity` đó,
  // hoặc là `img_demo` nếu `activityImages[0]?.link` không tồn tại (sử dụng optional chaining `?.` và logical OR `||`).
  const [selectedImages, setSelectedImages] = React.useState({});
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  React.useEffect(() => {
    const initialSelectedImages = processingPhases.reduce((acc, phase) => {
      phase.activities.forEach((activity) => {
        acc[activity.activityId] = activity.activityImages[0]?.link || img_demo;
      });
      return acc;
    }, {});
    setSelectedImages(initialSelectedImages);
  }, [processingPhases]);

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

  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  const steps = processingPhases.map((phase) => ({
    label: `${phase.name} Số tiền: (${formatMoney(phase.currentMoney)} VND)`,
    description: phase.createDate
      ? `Ngày bắt đầu: ${format(
          new Date(phase.createDate),
          "dd/MM/yyyy, h:mm:ss a"
        )}\nNgày kết thúc: ${
          phase.endDate
            ? format(new Date(phase.endDate), "dd/MM/yyyy, h:mm:ss a")
            : "Chưa có"
        }`
      : "Chưa bắt đầu giai đoạn",
  }));

  console.log(steps);

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        size="lg"
        variant="circle-alt"
        orientation="vertical"
        onClickStep={(step, setStep) => {
          setStep(step);
        }}
      >
        {processingPhases.map((phase, index) => (
          <Step
            key={phase.processingPhaseId}
            label={steps[index].label}
            description={steps[index].description}
          >
            <div className="flex flex-col space-y-4">
              {phase.isEnd === false ? (
                <Badge className={"w-fit"} variant="secondary">
                  Đang xử lý
                </Badge>
              ) : (
                <Badge className={"w-fit"} variant="success">
                  Đã xử lý
                </Badge>
              )}
              {phase.activities.length === 0 ? (
                <p className="text-muted-foreground">Không có hoạt động nào</p>
              ) : (
                phase.activities.map((activity) => (
                  <Card
                    key={activity.activityId}
                    className="flex flex-col space-y-4"
                  >
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
                              <div
                                className="relative w-full h-full"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                              >
                                <img
                                  src={selectedImages[activity.activityId]}
                                  alt="Activity Image"
                                  className="w-full h-full rounded-md object-cover"
                                />
                                {isHovered && (
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
                                            className="w-full h-full rounded-md object-cover"
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
                  </Card>
                ))
              )}
            </div>
          </Step>
        ))}
        {/* <Footer /> */}
      </Stepper>
    </div>
  );
};

export default ActivitiesCampaign;
