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
import React from "react";
import { Badge } from "../../../ui/badge";
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEISACTIVED } from "../../../../api/apiConstants";
const EditUserForm = ({ isOpen, onOpenChange, user }) => {
  const { toast } = useToast();
  // Formik setup

  const updateStatus = async (accountID, isActived) => {
    try {
      const response = await axiosPrivate.put(UPDATEISACTIVED, {
        accountID: accountID,
        isActived: isActived,
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



  const formik = useFormik({
    initialValues: {
      isActived: user ? user.isActived : false,
      accountID: user ? user.accountID : ""
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values.accountID);
      updateStatus(values.accountID, values.isActived)
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, 
  và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, 
  nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề
   này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when user changes
  React.useEffect(() => {
    setValuesRef.current({
      isActived: user ? user.isActived : false,
      accountID: user ? user.accountID : ""
      
    });
  }, [user]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Thông tin người dùng</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái của người dùng!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
          {/* Show avatar người dùng */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center space-x-2">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={user ? user.avatar : ""}
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
                  defaultValue={user ? user.accountID : ""}
                  disabled
                />
                <CopyButton code={user ? user.accountID : ""} />
              </div>
            </div>
          </div>
          {/* Show tên người dùng */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="username">Tên người dùng</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="username"
                  defaultValue={user ? user.username : ""}
                  disabled
                />
                <CopyButton code={user ? user.username : ""} />
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
                  defaultValue={user ? user.email : ""}
                  disabled
                />
                <CopyButton code={user ? user.email : ""} />
              </div>
            </div>
          </div>
          {/* Show mật khẩu */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="hashPassword">Mật khẩu</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="hashPassword"
                  defaultValue={user ? user.hashPassword : ""}
                  disabled
                />
                <CopyButton code={user ? user.hashPassword : ""} />
              </div>
            </div>
          </div>
          {/* Show ngày tạo */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="createdAt"
                  disabled
                  defaultValue={user ? user.createdAt : ""}
                />
                <CopyButton code={user ? user.createdAt : ""} />
              </div>
            </div>
          </div>
          {/* Show role thành viên */}
          <div className="flex mb-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="role">Role</Label>
              <div className="flex items-center space-x-2">
              <Badge variant="primary">User</Badge>
                {/* {user ? (
                  user.role === "Admin" ? (
                    <Badge variant="success">Admin</Badge>
                  ) : user.role === "User" ? (
                    <Badge variant="primary">User</Badge>
                  ) : user.role === "Member" ? (
                    <Badge variant="info">Member</Badge>
                  ) : user.role === "OrganizationManager" ? (
                    <Badge variant="warning">Organization Manager</Badge>
                  ) : user.role === "RequestManager" ? (
                    <Badge variant="danger">Request Manager</Badge>
                  ) : (
                    <Badge variant="secondary">Unknown</Badge>
                  )
                ) : (
                  "No user"
                )} */}
              </div>
            </div>
          </div>
          {user && (
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              {/*  */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActived"
                  checked={formik.values.isActived}
                  onCheckedChange={handleSwitchChange("isActived")}
                />
                <Label htmlFor="isActived">Trạng thái</Label>
              </div>
             
            </form>
          )}
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

export default EditUserForm;
