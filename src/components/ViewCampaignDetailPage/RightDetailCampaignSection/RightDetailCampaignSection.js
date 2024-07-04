import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { BadgeCheck, Target, Clock4, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import img_demo from "../../../assets/images/placeholder.svg";
import { Progress } from "../../ui/progress";
import { Button } from "../../ui/button";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { Badge } from "../../ui/badge";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

const RightDetailCampaignSection = ({ data }) => {
  const { isLogin } = React.useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  // console.log("user", user);
  // Hàm xử lý khi click vào nút ủng hộ
  const handleDonateClick = () => {
    if (isLogin) {
      navigate(`/donate/${data.campaignID}`);
    } else {
      setIsDialogOpen(true);
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleContinueLogin = () => {
    // Navigate to login page or handle the login flow
    navigate("/login"); // Adjust the login path as necessary
    setIsDialogOpen(false);
  };
  // Chuyển đổi expectedEndDate từ string sang Date và tính toán số ngày còn lại
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Ngày hiện tại
    const end = parseISO(endDate); // Chuyển đổi endDate sang định dạng Date
    return differenceInCalendarDays(end, today); // Tính toán số ngày còn lại
  };
  // Hàm format số tiền ủng hộ
  const targetAmountFormat = (targetAmount) => {
    // Remove non-digit characters from the input targetAmount
    const cleanValue = targetAmount.replace(/\D/g, "");
    // Format the targetAmount with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  // console.log("isDialogOpen", isDialogOpen);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={
                  data.organization
                    ? data.organization.logo
                    : data.member
                    ? data.member.account.avatar
                    : img_demo
                }
              />
              <AvatarFallback>
                {data.organization
                  ? data.organization.name
                  : data.member
                  ? data.member.lastname
                  : "Logo"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardDescription>Tiền ủng hộ sẽ được chuyển đến</CardDescription>
              <div className="flex gap-x-3">
                <CardTitle className="text-lg mobile:text-xl">
                  {data.organization
                    ? data.organization.name
                    : data.member
                    ? data.member.firstName + " " +  data.member.lastName
                    : "Không xác định"}
                </CardTitle>
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col justify-center items-center py-6">
          <div className="flex w-full items-center justify-between">
            {/* Mục tiêu chiến dịch */}
            <div className="flex items-center justify-center gap-x-3">
              <Target className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Mục tiêu chiến dịch</p>
                <p className="font-bold">
                  {targetAmountFormat(data.targetAmount)} VND
                </p>
              </div>
            </div>
            {/* Thời gian còn lại */}
            <div className="flex items-center justify-center gap-x-3">
              <Clock4 className="h-10 w-10" />
              <div>
                <p className="text-muted-foreground">Thời gian còn lại</p>
                <p className="font-bold">
                  {calculateDaysLeft(data.expectedEndDate)} ngày
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 my-5">
            <MapPin className="h-6 w-6" />
            <p>{data.address}</p>
          </div>
          {data.donatePhase.isProcessing ? (
            <div className="w-full mb-3">
              <Badge variant="default">{data.donatePhase.name}</Badge>
            </div>
          ) : data.processingPhase.isProcessing ? (
            <div className="w-full mb-3">
              <Badge variant="default">{data.processingPhase.name}</Badge>
            </div>
          ) : data.statementPhase.isProcessing ? (
            <div className="w-full mb-3">
              <Badge variant="default">{data.statementPhase.name}</Badge>
            </div>
          ) : (
            <div className="mb-3">
              <Badge variant="destructive">Chiến dịch này đã đóng!</Badge>
            </div>
          )}
          <div className="bg-white w-full space-y-3">
            <Progress
              value={data.donatePhase.percent}
              className="w-full bg-[#e9ecef] mb-2"
            />
            <div className="w-full flex justify-between">
              <p className="text-lg mb-2">
                Đã đạt được <b>{data.donatePhase.currentMoney} VND</b>
              </p>
              <p className="text-muted-foreground">
                {data.donatePhase.percent}%
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center">
            {data.donatePhase.isProcessing ? (
              <Button
                variant="default"
                size="lg"
                className="font-bold text-lg"
                onClick={handleDonateClick}
              >
                Ủng hộ
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="font-bold text-lg"
                disabled={true}
              >
                Ủng hộ
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      {isDialogOpen ? (
        <AlertDialog defaultOpen={isDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Vui lòng đăng nhập để có thể ủng hộ chiến dịch
              </AlertDialogTitle>
              <AlertDialogDescription>
                Bạn hãy vui lòng đăng nhập để có thể ủng hộ chiến dịch, điều này
                sẽ giúp cho ứng dụng thiện nguyện minh bạch hơn !
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseDialog} className={"m-0"}>
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleContinueLogin}
                className={"m-0"}
              >
                Tiếp tục
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
};

export default RightDetailCampaignSection;
