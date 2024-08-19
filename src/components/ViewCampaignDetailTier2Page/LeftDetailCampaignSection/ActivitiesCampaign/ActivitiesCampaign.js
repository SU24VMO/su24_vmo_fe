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
import { Step, Stepper, useStepper } from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";
import StatementCard from "./StatementCard";

const ActivitiesCampaign = ({ processingPhases }) => {
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

  const calculateInitialStep = (processingPhases) => {
    let step = 0;
    for (const phase of processingPhases) {
      if (phase.isProcessing) {
        break;
      }
      step++;
    }
    return step;
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
    description: phase?.startDate
      ? `Ngày bắt đầu: ${format(
          new Date(phase?.startDate),
          "dd/MM/yyyy, h:mm:ss a"
        )}\nNgày kết thúc: ${
          phase?.endDate
            ? format(new Date(phase?.endDate), "dd/MM/yyyy, h:mm:ss a")
            : "Chưa có"
        }`
      : "Chưa bắt đầu giai đoạn",
  }));

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={calculateInitialStep(processingPhases)}
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
                    className="flex flex-col space-y-4 max-w-lg"
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
                              className="text-black my-3"
                              dangerouslySetInnerHTML={{
                                __html: activity.content.replace(
                                  /(?:\r\n|\r|\n)/g,
                                  "<br>"
                                ),
                              }}
                            />
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
                      </>
                    ) : (
                      <CardContent>
                        <div className="text-center text-gray-500 mt-5">
                          Hoạt động đang chờ được duyệt
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
              {phase.processingPhaseStatementFiles.length === 0 ? (
                <p className="text-muted-foreground">Chưa có sao kê nào</p>
              ) : (
                <div className="flex flex-col space-y-4">
                  <p className="text-black font-bold">Sao kê</p>
                  <div className="grid mobile:grid-cols-3 gap-6">
                    {phase.processingPhaseStatementFiles.map((file, index) => (
                      <StatementCard
                        key={index}
                        statementImage={file.link}
                        statementCreatedDate={file.createDate}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ActivitiesCampaign;
