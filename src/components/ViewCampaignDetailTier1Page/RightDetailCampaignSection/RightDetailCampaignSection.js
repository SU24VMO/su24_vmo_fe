import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { BadgeCheck, Target, Clock4, MapPin, BadgeAlert } from "lucide-react";
import { Progress } from "../../ui/progress";
import { useParams } from "react-router-dom";
import CustomAvatarRightCampaignDetail from "./CustomAvatarRightCampaignDetail/CustomAvatarRightCampaignDetail";
import CustomCreatorCampaignName from "./CustomCreatorCampaignName/CustomCreatorCampaignName";
import CustomDonateButtonCampaign from "./CustomDonateButtonCampaign/CustomDonateButtonCampaign";
import CustomCalculateDayLeft from "./CustomCalculateDayLeft/CustomCalculateDayLeft";
import CustomAlertDialogNotLogin from "./CustomAlertDialogNotLogin/CustomAlertDialogNotLogin";
import { format } from "date-fns";
import CustomStepperCampaignDetail from "./CustomStepperCampaignDetail/CustomStepperCampaignDetail";
import CustomActionButtonCampaign from "./CustomActionButtonCampaign/CustomActionButtonCampaign";
import CustomTopDonator from "./CustomTopDonator/CustomTopDonator";
import { Badge } from "../../ui/badge";

const RightDetailCampaignSection = ({ data }) => {
  const { id: campaignId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Hàm format số tiền ủng hộ
  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  // Hàm format số tiền ủng hộ
  const targetAmountFormat = (targetAmount) => {
    // Remove non-digit characters from the input targetAmount
    const cleanValue = targetAmount.replace(/\D/g, "");
    // Format the targetAmount with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  console.log("check data", data);

  return (
    <>
      <Card className="mb-3">
        <CardHeader>
          <div className="flex items-center gap-x-3">
            <CustomAvatarRightCampaignDetail data={data} />
            <div className="flex flex-col">
              <CardDescription>Chiến dịch được tạo bởi</CardDescription>
              <div className="flex items-center gap-x-3">
                <CustomCreatorCampaignName data={data} />
                {data.isTransparent ? (
                  <BadgeCheck className="h-6 w-6 text-green-600" />
                ) : (
                  <BadgeAlert className="h-6 w-6 text-red-600" />
                )}
              </div>
              <CardDescription>
                Vào lúc :{" "}
                {format(new Date(data.createAt), "dd/MM/yyyy, h:mm:ss a")}{" "}
              </CardDescription>
              <Badge className={"w-fit"}>Chiến dịch giải ngân toàn phần</Badge>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardHeader className="flex items-center justify-center">
          <CustomStepperCampaignDetail data={data} />
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col justify-center items-center py-6">
          <div className="flex w-full items-center justify-between">
            {/* Mục tiêu chiến dịch */}
            <div className="flex items-center justify-center gap-x-3">
              <Target className="h-5 w-5 laptop:h-10 laptop:w-10" />
              <div>
                <p className="text-sm laptop:text-base text-muted-foreground">
                  Mục tiêu chiến dịch
                </p>
                <p className="text-sm laptop:text-base font-bold">
                  {targetAmountFormat(data.targetAmount)} VND
                </p>
              </div>
            </div>
            {/* Thời gian còn lại */}
            <div className="flex items-center justify-center gap-x-3">
              <Clock4 className="h-5 w-5 laptop:h-10 laptop:w-10" />
              <div>
                <p className="text-sm laptop:text-base text-muted-foreground">
                  Thời gian ủng hộ còn lại
                </p>
                <CustomCalculateDayLeft data={data} />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 my-5">
            <MapPin className="h-6 w-6" />
            <p className="text-sm laptop:text-base">{data.address}</p>
          </div>
          <div className="bg-white w-full space-y-3">
            <Progress
              value={data.donatePhase.percent}
              className="w-full bg-[#e9ecef] mb-2"
            />
            <div className="w-full flex justify-between">
              <p className="text-lg mb-2">
                Đã đạt được{" "}
                <b>{formatMoney(data.donatePhase.currentMoney)} VND</b>
              </p>
              <p className="text-muted-foreground">
                {data.donatePhase.percent}%
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col items-center justify-center">
            <CustomDonateButtonCampaign
              data={data}
              setIsDialogOpen={setIsDialogOpen}
            />
            <CustomActionButtonCampaign
              data={data}
              campaignId={campaignId}
              campaignTier={data.campaignTier}
            />
          </div>
        </CardFooter>
      </Card>
      {isDialogOpen ? (
        <CustomAlertDialogNotLogin
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      ) : null}
      <CustomTopDonator />
    </>
  );
};

export default RightDetailCampaignSection;
