import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { format } from "date-fns";
import { useToast } from "../../ui/use-toast";
import { ToastAction } from "../../ui/toast";
import emailIcon from "../../../assets/icons/EmailIcon.svg";
import facebookIcon from "../../../assets/icons/FacebookIcon.svg";
import tiktokIcon from "../../../assets/icons/TiktokIcon.svg";
import youtubeIcon from "../../../assets/icons/YoutubeIcon.svg";
import { Button } from "../../ui/button";

const OrganizationManagerInformation = ({ organizationManagerData }) => {
  const { toast } = useToast();

  // Hàm xử lý khi click vào các icon mạng xã hội
  const handleSocialMediaRedirect = (link) => {
    if (link === "" || link === null || link === undefined) {
      toast({
        variant: "destructive",
        title: `Quản lý tổ chức chưa thiết lập thông tin này!`,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage
            src={
              organizationManagerData.account.avatar
                ? organizationManagerData.account.avatar
                : ""
            }
          />
          <AvatarFallback>{organizationManagerData.lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium">
            {organizationManagerData.firstName}{" "}
            {organizationManagerData.lastName}
          </p>
          <p className="text-muted-foreground">Quản lý tổ chức</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Số điện thoại
          </p>
          <p>{organizationManagerData.phoneNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Ngày tháng năm sinh
          </p>
          <p>
            {format(new Date(organizationManagerData.birthDay), "dd/MM/yyyy")}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Các thông tin khác:
          </p>
          <div className="w-full flex space-x-3">
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                handleSocialMediaRedirect(
                  `mailto:${organizationManagerData?.account?.email}`
                )
              }
            >
              <img src={emailIcon} alt="" className="w-8 h-8" />
            </Button>
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                handleSocialMediaRedirect(organizationManagerData?.facebookUrl)
              }
            >
              <img src={facebookIcon} alt="" className="w-8 h-8" />
            </Button>
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                handleSocialMediaRedirect(organizationManagerData?.tiktokUrl)
              }
            >
              <img src={tiktokIcon} alt="" className="w-8 h-8" />
            </Button>
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                handleSocialMediaRedirect(organizationManagerData?.youtubeUrl)
              }
            >
              <img src={youtubeIcon} alt="" className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationManagerInformation;
