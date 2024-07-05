import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area";
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
import { ImageDown } from "lucide-react";
import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../../context/AuthContext";
import { Loader2 } from "lucide-react";
import { ToastAction } from "../../../../components/ui/toast";

import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVEACTIVITYREQUEST } from "../../../../api/apiConstants";


const EditStatusForm = ({ isOpen, onOpenChange, activity, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)


  const updateStatus = async (data) => {
    try {
      setLoading(true)

      const response = await axiosPrivate.put(UPDATEAPPROVEACTIVITYREQUEST, {

        createActivityRequestId: activity.createActivityRequestID,
        moderatorId: user.moderator_id,
        isApproved: data.isApproved,
      });



      if (response.status === 200) {
        onSubmitSuccess()
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
      onOpenChange(false);
      setLoading(false)

    }
  }


  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: activity ? activity.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      updateStatus(values)
      setSubmitting(false);
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when activity changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: activity ? activity.isApproved : false,
    });
  }, [activity]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };


  console.log('====================================');
  console.log(activity);
  console.log('====================================');
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet">
        <DialogHeader>
          <DialogTitle>Chi tiết hoạt động</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của hoạt động!
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
          <div className="flex flex-col gap-5">
            {/* Show tên hoạt động */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="title"
                    defaultValue={activity ? activity.activity.title : ""}
                    disabled
                  />
                  <CopyButton code={activity ? activity.activity.title : ""} />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="member">Tạo bởi thành viên</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="member"
                    defaultValue={activity?.member ? (activity.member?.firstName + " " + activity.member?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={activity?.member ? (activity.member?.firstName + " " + activity.member?.lastName) : ""} />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="create_by_om">Tạo bởi quản lí tổ chức</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="create_by_om"
                    defaultValue={activity?.organizationManager ? (activity.organizationManager?.firstName + activity.organizationManager?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={activity?.organizationManager ? (activity.organizationManager?.firstName + activity.organizationManager?.lastName) : ""} />
                </div>
              </div>
            </div>
            {/* Show nội dung bài đăng*/}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="content">Nội dung tiêu điểm</Label>
                <div className="flex items-center space-x-2">
                  <p>
                    {activity ? activity.activity?.content : ""}
                  </p>
                </div>
              </div>
            </div>
            {/* Show ảnh bài đăng*/}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link">Ảnh</Label>
                <div className="max-w-40">
                  <img
                    src={activity ? activity.link : ""}
                    alt="link"
                    width="160"
                    height="160"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                {activity && activity.link && (
                  <a href={activity.link} download>
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

            {/* Show ngày tạo */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="createDate">Ngày tạo</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {activity ? format(new Date(activity?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={activity ? format(new Date(activity?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            {/* Show Ngày duyệt */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="approvedDate">Ngày duyệt</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {activity ? format(new Date(activity?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={activity ? format(new Date(activity?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            {/* Show ngày Ngày cập nhật */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="updateDate">Ngày cập nhật</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {activity ? format(new Date(activity?.updateDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={activity ? format(new Date(activity?.updateDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            {activity && (
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
