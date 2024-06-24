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
import { UPDATEAPPROVECAMPAIGNREQUEST  } from "../../../../api/apiConstants";
import { AuthContext } from "../../../../context/AuthContext";
import { ImageDown } from "lucide-react";

import { format } from "date-fns";
import React, { useContext } from "react";
const EditStatusForm = ({ isOpen, onOpenChange, campaigns }) => {
  const { toast } = useToast();
  const {user} = useContext(AuthContext)
  console.log(campaigns);
  const updateStatus = async (data) => {
    try {
      const response = await axiosPrivate.put( UPDATEAPPROVECAMPAIGNREQUEST, {
        createCampaignRequestID: campaigns.createCampaignRequestID,
        requestManagerId:user.request_manager_id,
        isApproved: data.isApproved,
      });

      if (response.status === 200) {
        console.log(response);
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Cập nhật thất bại !",
          description: "Vui lòng kiểm tra lại thông tin cập nhật !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cập nhật thất bại !",
        description: "Vui lòng kiểm tra lại thông tin cập nhật !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
    }
  }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: campaigns ? campaigns.isApproved : false,

    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatus(values)
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when campaign changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: campaigns ? campaigns.isApproved : false,

    });
  }, [campaigns]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  const formatAmount = (value) => {
    // Remove non-digit characters from the input value
    const cleanValue = value.replace(/\D/g, '');
    // Format the value with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + " VND";
};

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet ">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt chiến dịch</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của chiến dịch!
          </DialogDescription>
        </DialogHeader>
     
        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
         <div className="flex flex-col gap-5">
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
                {campaigns?.campaign  && campaigns.campaign?.image && (
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
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {campaigns?.campaign ? campaigns.campaign?.description : ""}
                </Badge>
                <CopyButton
                  code={campaigns?.campaign ? campaigns.campaign?.description : ""}
                />
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
              <Label htmlFor="user">Tạo bởi thành viên</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="user"
                  defaultValue={campaigns?.user ? (campaigns.user?.firstName + campaigns.user?.lastName  ) : ""}
                  disabled
                />
                <CopyButton code={campaigns?.user ? (campaigns.user?.firstName + campaigns.user?.lastName  ) : ""} />
              </div>
            </div>
          </div>
         <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="create_by_om">Tạo bởi quản lí tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="create_by_om"
                  defaultValue={campaigns?.organizationManager ? (campaigns.organizationManager?.firstName + campaigns.organizationManager?.lastName)  : ""}
                  disabled
                />
                <CopyButton code={campaigns?.organizationManager ? (campaigns.organizationManager?.firstName + campaigns.organizationManager?.lastName) : ""} />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organization">Tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organization"
                  defaultValue={campaigns?.campaign ? campaigns.campaign?.organization : ""}
                  disabled
                />
                <CopyButton code={campaigns?.campaign ? campaigns.campaign?.organization : ""} />
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
              <Label htmlFor="approved_by">Duyệt bởi</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {campaigns?.requestManager ? (campaigns.requestManager?.firstName + campaigns.requestManager?.lastName) : "Chưa có"}
                </Badge>
                <CopyButton
                  code={campaigns?.requestManager ? (campaigns.requestManager?.firstName + campaigns.requestManager?.lastName) : "Chưa có"}
                />
              </div>
            </div>
          </div>
          {campaigns && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/*  */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isApproved"
                checked={formik.values.isApproved}
                onCheckedChange={handleSwitchChange("isApproved")}
              />
              <Label htmlFor="isApproved">Chấp thuận</Label>
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
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
