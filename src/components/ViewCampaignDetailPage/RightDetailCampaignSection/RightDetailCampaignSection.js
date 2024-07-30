import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import {
  BadgeCheck,
  Target,
  Clock4,
  MapPin,
  ExternalLink,
  MessageSquareWarning,
} from "lucide-react";
import { Progress } from "../../ui/progress";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { CopyButton } from "./Feature/CopyButton";
import CustomAvatarRightCampaignDetail from "./CustomAvatarRightCampaignDetail/CustomAvatarRightCampaignDetail";
import CustomCreatorCampaignName from "./CustomCreatorCampaignName/CustomCreatorCampaignName";
import CustomDonateButtonCampaign from "./CustomDonateButtonCampaign/CustomDonateButtonCampaign";
import CustomCalculateDayLeft from "./CustomCalculateDayLeft/CustomCalculateDayLeft";
import CustomAlertDialogNotLogin from "./CustomAlertDialogNotLogin/CustomAlertDialogNotLogin";
import { format } from "date-fns";
import CustomStepperCampaignDetail from "./CustomStepperCampaignDetail/CustomStepperCampaignDetail";

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

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-x-3">
            <CustomAvatarRightCampaignDetail data={data} />
            <div className="flex flex-col">
              <CardDescription>Chiến dịch được tạo bởi</CardDescription>
              <div className="flex items-center gap-x-3">
                <CustomCreatorCampaignName data={data} />
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
              <CardDescription>
                Vào lúc :{" "}
                {format(new Date(data.createAt), "dd/MM/yyyy, h:mm:ss a")}{" "}
              </CardDescription>
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
            <div className="w-full flex flex-row items-center justify-end">
              <div className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger>
                    <ExternalLink />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Lan tỏa yêu thương đến cộng đồng
                      </DialogTitle>
                      <DialogDescription>
                        Bằng cách chia sẻ chiến dịch{" "}
                        <span className="font-bold text-black">
                          {data.name}
                        </span>
                        , bạn sẽ góp phần giúp đỡ những hoàn cảnh khó khăn.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">
                          Vui lòng sao chép đường dẫn sau để chia sẻ chiến dịch
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="link"
                            defaultValue={`https://su24-vmo-fe.vercel.app/viewCampaigns/campaignDetail/${campaignId}`}
                            disabled
                          />
                          <CopyButton
                            code={`https://su24-vmo-fe.vercel.app/viewCampaigns/campaignDetail/${campaignId}`}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center">
                <a
                  href="mailto:vmoreport@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquareWarning className="h-6 w-6 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      {isDialogOpen ? (
        <CustomAlertDialogNotLogin
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      ) : null}
    </>
  );
};

export default RightDetailCampaignSection;
