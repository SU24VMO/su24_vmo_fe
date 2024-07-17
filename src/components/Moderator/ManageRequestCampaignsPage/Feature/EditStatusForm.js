import React, { useContext, useState, useRef, useEffect } from "react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { useFormik } from "formik";
import { useToast } from "../../../ui/use-toast";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { CopyButton } from "./CopyButton";
import { Switch } from "../../../ui/switch";
import { Badge } from "../../../ui/badge";
import { ScrollArea } from "../../../ui/scroll-area"
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVECAMPAIGNREQUEST } from "../../../../api/apiConstants";
import { AuthContext } from "../../../../context/AuthContext";
import { ImageDown } from "lucide-react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const EditStatusForm = ({ isOpen, onOpenChange, campaigns, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const description = campaigns?.campaign?.description ? (campaigns?.campaign?.description?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có" ;


  const updateStatus = async (data) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.put(UPDATEAPPROVECAMPAIGNREQUEST, {
        createCampaignRequestID: campaigns.createCampaignRequestID,
        moderatorId: user.moderator_id,
        isApproved: data.isApproved,
      });

      if (response.status === 200) {
        onSubmitSuccess();
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } 
    } catch (error) {
      if (error.response && error.response.data) {
        const serverMessage = error?.response?.data?.message;
        toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: serverMessage,
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
    }
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      isApproved: campaigns ? campaigns.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatus(values);
      setSubmitting(false);
    },
  });

  const setValuesRef = useRef(formik.setValues);

  useEffect(() => {
    setValuesRef.current({
      isApproved: campaigns ? campaigns.isApproved : false,
    });
  }, [campaigns]);

  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };

  const formatAmount = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + " VND";
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt chiến dịch</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của chiến dịch!
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[65vh] shadow-inner">
          <div className="flex flex-col p-5 gap-5">
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Tên chiến dịch</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="name"
                    defaultValue={campaigns?.campaign ? campaigns.campaign?.name : ""}
                    disabled
                  />
                  <CopyButton code={campaigns?.campaign ? campaigns.campaign?.name : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="targetAmount">Mục tiêu</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {campaigns?.campaign ? formatAmount(campaigns.campaign?.targetAmount) : ""}
                  </Badge>
                  <CopyButton
                    code={campaigns?.campaign ? formatAmount(campaigns.campaign?.targetAmount) : ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="image">Ảnh nền</Label>
                <div className="w-1/3 mx-auto">
                  <img
                    src={campaigns?.campaign ? campaigns.campaign?.image : ""}
                    alt="ảnh-nền"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                {campaigns?.campaign && campaigns.campaign?.image && (
                  <a href={campaigns.campaign?.image} download>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <ImageDown className="h-6 w-6" />
                      Tải về
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <div className="flex items-center space-x-2 text-sm">
                  <div variant={"outline"}>
                    <div dangerouslySetInnerHTML={{ __html: isExpanded ? description : description?.substring(0, 500) + '...' }} />
                    <Button variant="link" onClick={toggleDescription}>
                      {isExpanded ? "Thu gọn" : "Xem thêm"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="address"
                    defaultValue={campaigns?.campaign ? campaigns.campaign?.address : ""}
                    disabled
                  />
                  <CopyButton code={campaigns?.campaign ? campaigns.campaign?.address : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="applicationConfirmForm">Đơn duyệt từ địa phương</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="applicationConfirmForm"
                    defaultValue={campaigns?.campaign ? campaigns.campaign?.applicationConfirmForm : ""}
                    disabled
                  />
                  <CopyButton code={campaigns?.campaign ? campaigns.campaign?.applicationConfirmForm : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="member">Tạo bởi tình nguyện viên</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="member"
                    defaultValue={campaigns?.member ? (campaigns.member?.firstName + campaigns.member?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={campaigns?.member ? (campaigns.member?.firstName + campaigns.member?.lastName) : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="create_by_om">Tạo bởi quản lí tổ chức</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="create_by_om"
                    defaultValue={campaigns?.organizationManager ? (campaigns.organizationManager?.firstName + campaigns.organizationManager?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={campaigns?.organizationManager ? (campaigns.organizationManager?.firstName + campaigns.organizationManager?.lastName) : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="create_date">Ngày tạo chiến dịch</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {campaigns ? format(new Date(campaigns?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={campaigns ? format(new Date(campaigns?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {campaigns?.campaign ? format(new Date(campaigns.campaign?.startDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={campaigns?.campaign ? format(new Date(campaigns.campaign?.startDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="expectedEndDate">Ngày kết thúc (dự kiến)</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {campaigns?.campaign ? format(new Date(campaigns.campaign?.expectedEndDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={campaigns?.campaign ? format(new Date(campaigns.campaign?.expectedEndDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="approved_by">Người duyệt</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {campaigns?.moderator ? (campaigns.moderator?.firstName + campaigns.moderator?.lastName) : "Chưa có"}
                  </Badge>
                  <CopyButton
                    code={campaigns?.moderator ? (campaigns.moderator?.firstName + campaigns.moderator?.lastName) : "Chưa có"}
                  />
                </div>
              </div>
            </div>

            {campaigns && (
              <form onSubmit={formik.handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isApproved"
                      checked={formik.values.isApproved}
                      onCheckedChange={() => handleSwitchChange(true)}
                    />
                    <Label htmlFor="isApproved">Chấp thuận</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isApproved"
                      checked={!formik.values.isApproved}
                      onCheckedChange={() => handleSwitchChange(false)}
                    />
                    <Label htmlFor="isApproved">Từ chối</Label>
                  </div>
                </div>
              </form>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="  animate-spin flex items-center justify-center w-full" />
              </>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
