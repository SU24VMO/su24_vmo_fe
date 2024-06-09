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
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Switch } from "../../../ui/switch";
import React from "react";
const EditUserForm = ({ isOpen, onOpenChange, user }) => {
  const { toast } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isActive: user ? user.isActive : false,
      isBlocked: user ? user.isBlocked : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      toast({
        title: "Thông tin chỉnh sửa:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-black p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>{" "}
            {/* For testing*/}
          </pre>
        ),
      });
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when user changes
  React.useEffect(() => {
    setValuesRef.current({
      isActive: user ? user.isActive : false,
      isBlocked: user ? user.isBlocked : false,
    });
  }, [user]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
    formik.setFieldValue(
      field === "isActive" ? "isBlocked" : "isActive",
      !isChecked
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái của người dùng!
          </DialogDescription>
        </DialogHeader>
        {/* Show avatar người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="userName">Avatar</Label>
            <div className="flex items-center space-x-2">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user ? user.userAvatar : ""} alt="@avatar" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        {/* Show tên người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="userName">Tên người dùng</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="userName"
                defaultValue={user ? user.userName : ""}
                disabled
              />
              <CopyButton code={user ? user.userName : ""} />
            </div>
          </div>
        </div>
        {/* Show email */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="userEmail">Email</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="userEmail"
                defaultValue={user ? user.userEmail : ""}
                disabled
              />
              <CopyButton code={user ? user.userEmail : ""} />
            </div>
          </div>
        </div>
        {/* Show mật khẩu */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="userPassword">Mật khẩu</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="userPassword"
                defaultValue={user ? user.userPassword : ""}
                disabled
              />
              <CopyButton code={user ? user.userPassword : ""} />
            </div>
          </div>
        </div>
        {/* Show ngày tạo */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="createAt">Ngày tạo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="createAt"
                disabled
                defaultValue={user ? user.createAt : ""}
              />
              <CopyButton code={user ? user.createAt : ""} />
            </div>
          </div>
        </div>
        {user && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/*  */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formik.values.isActive}
                onCheckedChange={handleSwitchChange("isActive")}
              />
              <Label htmlFor="isActive">Trạng thái</Label>
            </div>
            <div className="items-center space-x-2 hidden">
              <Switch
                id="isBlocked"
                checked={formik.values.isBlocked}
                onCheckedChange={handleSwitchChange("isBlocked")}
              />
              <Label htmlFor="isBlocked">Dừng hoạt động</Label>
            </div>
          </form>
        )}

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
