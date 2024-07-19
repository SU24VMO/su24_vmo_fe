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
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Switch } from "../../../ui/switch";
import React, { useState } from "react";
import { Badge } from "../../../ui/badge";
import { ToastAction } from "../../../ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEISACTIVED } from "../../../../api/apiConstants";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
const EditMemberForm = ({ isOpen, onOpenChange, member, onSubmitSuccess }) => {
  const { toast } = useToast();
  // Formik setup
  const [loading, setLoading] = useState(false)

  const updateStatus = async (accountID, isActived) => {
    try {
      setLoading(true)

      const response = await axiosPrivate.put(UPDATEISACTIVED, {
        accountID: accountID,
        isActived: isActived,
      });

      if (response.status === 200) {
        onSubmitSuccess();
        console.log(response);
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
      setLoading(false)

    }
  }



  const formik = useFormik({
    initialValues: {
      isActived: member ? member.isActived : false,
      accountID: member ? member.accountID : ""
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values.accountID);
      updateStatus(values.accountID, values.isActived)
      setSubmitting(false);
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, 
  và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, 
  nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề
   này là sử dụng memberef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when member changes
  React.useEffect(() => {
    setValuesRef.current({
      isActived: member ? member.isActived : false,
      accountID: member ? member.accountID : ""

    });
  }, [member]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);

  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet">
        <DialogHeader>
          <DialogTitle>Thông tin người dùng</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái của người dùng!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
          <div className="flex flex-col gap-5">
            {/* Show avatar người dùng */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={member ? member.avatar : ""}
                      alt="@avatar"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            {/* Show id người dùng */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="accountID">ID tài khoản</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="accountID"
                    defaultValue={member ? member?.accountID : ""}
                    disabled
                  />
                  <CopyButton code={member ? member?.accountID : ""} />
                </div>
              </div>
            </div>
            {/* Show tên người dùng */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="membername">Tên người dùng</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="membername"
                    defaultValue={member ? member?.username : ""}
                    disabled
                  />
                  <CopyButton code={member ? member?.username : ""} />
                </div>
              </div>
            </div>
            {/* Show email */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="email"
                    defaultValue={member ? member?.email : ""}
                    disabled
                  />
                  <CopyButton code={member ? member?.email : ""} />
                </div>
              </div>
            </div>

            {/* Show ngày tạo */}



            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="create_date">Ngày tạo</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {member ? format(new Date(member?.createdAt), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={member ? format(new Date(member?.createdAt), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>


            {/* Show role thành viên */}
            <div className="flex mb-3">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="role">Vai trò</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="primary">Thành viên</Badge>

                </div>
              </div>
            </div>
            {member && (
              <form onSubmit={formik.handleSubmit} className="space-y-3">
                {/*  */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActived"
                    checked={formik.values.isActived}
                    onCheckedChange={handleSwitchChange("isActived")}
                  />
                  {formik.values?.isActived ? (
                    <Label htmlFor="isActived">Đang hoạt động</Label>
                  ) : (
                    <Label htmlFor="isActived">Dừng hoạt động</Label>
                  )}
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
            variant="green_theme_primary"
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

export default EditMemberForm;
