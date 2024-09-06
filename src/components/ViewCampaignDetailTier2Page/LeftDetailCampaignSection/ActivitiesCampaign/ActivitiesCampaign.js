import React from "react";
import img_demo from "../../../../assets/images/placeholder.svg";
import { format } from "date-fns";
import { Step, Stepper } from "../../../ui/stepper";
import { Badge } from "../../../ui/badge";
import { Separator } from "../../../ui/separator";
import ActivitiesImages from "./ActivitiesImages/ActivitiesImages";
import ActivitiesStatementFiles from "./ActivitiesStatementFiles/ActivitiesStatementFiles";
import { Button } from "../../../ui/button";
import AdminTransactions from "./AdminTransactions/AdminTransactions";

const ActivitiesCampaign = ({ processingPhases }) => {
  // Khởi tạo state với mỗi activityId là key và link ảnh đầu tiên là giá trị
  // Để khởi tạo, chúng ta sử dụng `activities.reduce()` để tạo ra object này từ mảng `activities`.
  // Với mỗi `activity`, chúng ta sử dụng `activityId` làm key.
  // Giá trị ban đầu cho mỗi key là link của ảnh đầu tiên trong mảng `activityImages` của `activity` đó,
  // hoặc là `img_demo` nếu `activityImages[0]?.link` không tồn tại (sử dụng optional chaining `?.` và logical OR `||`).
  const [selectedImages, setSelectedImages] = React.useState({});
  const [isHovered, setIsHovered] = React.useState({});
  const [showAllActivities, setShowAllActivities] = React.useState(false);
  const cardRef = React.useRef(null);
  const [cardHeight, setCardHeight] = React.useState(0);

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

  React.useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.clientHeight);
    }
  }, [selectedImages, showAllActivities]);

  // Hàm để cập nhật ảnh được chọn
  const handleSelectImage = (activityId, imageLink) => {
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [activityId]: imageLink,
    }));
  };

  const handleMouseEnter = (activityId) => {
    setIsHovered((prevHovered) => ({
      ...prevHovered,
      [activityId]: true,
    }));
  };

  const handleMouseLeave = (activityId) => {
    setIsHovered((prevHovered) => ({
      ...prevHovered,
      [activityId]: false,
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
            {phase.isEnd === false ? (
              <Badge className={"w-fit"} variant="secondary">
                Đang xử lý
              </Badge>
            ) : (
              <Badge className={"w-fit"} variant="success">
                Đã xử lý
              </Badge>
            )}
            <AdminTransactions adminTransactions={phase.adminTransactions} />
            <div className="flex flex-col space-x-4 mt-3">
              <div className="flex flex-col items-center space-y-4">
                {phase.activities.length === 0 ? (
                  <p className="text-muted-foreground">
                    Không có hoạt động nào
                  </p>
                ) : (
                  <>
                    {phase.activities
                      .slice(0, showAllActivities ? phase.activities.length : 2)
                      .map((activity) => (
                        <React.Fragment key={activity.activityId}>
                          <div className="flex space-y-4 tablet:space-y-0 tablet:flex-row flex-col space-x-4">
                            <div className="flex-1">
                              <ActivitiesImages
                                activity={activity}
                                selectedImages={selectedImages}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                handleDownload={handleDownload}
                                handleSelectImage={handleSelectImage}
                                isHovered={isHovered}
                                cardRef={cardRef}
                                onCardHeightChange={setCardHeight}
                              />
                            </div>
                            <div className="flex-1">
                              <ActivitiesStatementFiles
                                activity={activity}
                                cardHeight={cardHeight}
                              />
                            </div>
                          </div>
                          <Separator className="w-full" />
                        </React.Fragment>
                      ))}
                    {phase.activities.length > 2 && !showAllActivities && (
                      <Button
                        className="mt-4"
                        variant="green_theme_primary"
                        onClick={() => setShowAllActivities(true)}
                      >
                        Xem thêm
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ActivitiesCampaign;
