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
import React from "react";
import { Badge } from "../../../ui/badge";
const EditOrganizationManagerForm = ({
  isOpen,
  onOpenChange,
  organizationManager,
}) => {
  const { toast } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      is_block: organizationManager ? organizationManager.is_block : false,
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
      is_block: organizationManager ? organizationManager.is_block : false,
    });
  }, [organizationManager]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin quản lý tổ chức</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái của người dùng!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
        {/* Show họ người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="first_name">Họ</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="first_name"
                defaultValue={
                  organizationManager ? organizationManager.first_name : ""
                }
                disabled
              />
              <CopyButton
                code={organizationManager ? organizationManager.first_name : ""}
              />
            </div>
          </div>
        </div>
        {/* Show tên người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="last_name">Tên</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="last_name"
                defaultValue={
                  organizationManager ? organizationManager.last_name : ""
                }
                disabled
              />
              <CopyButton
                code={organizationManager ? organizationManager.last_name : ""}
              />
            </div>
          </div>
        </div>
        {/* Show giới tính */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="gender">Giới tính</Label>
            <div className="flex items-center space-x-2">
              <Badge variant={"outline"}>
                {organizationManager
                  ? organizationManager.gender === "Male"
                    ? "Nam"
                    : organizationManager.gender === "Female"
                    ? "Nữ"
                    : "Khác"
                  : ""}
              </Badge>
              <CopyButton
                code={
                  organizationManager
                    ? organizationManager.gender === "Male"
                      ? "Nam"
                      : organizationManager.gender === "Female"
                      ? "Nữ"
                      : "Khác"
                    : ""
                }
              />
            </div>
          </div>
        </div>
        {/* Show số điện thoại người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="phone_number">Số điện thoại</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="phone_number"
                defaultValue={
                  organizationManager ? organizationManager.phone_number : ""
                }
                disabled
              />
              <CopyButton
                code={
                  organizationManager ? organizationManager.phone_number : ""
                }
              />
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
                defaultValue={
                  organizationManager ? organizationManager.email : ""
                }
                disabled
              />
              <CopyButton
                code={organizationManager ? organizationManager.email : ""}
              />
            </div>
          </div>
        </div>
        {/* Show birthday */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="birthday">Sinh nhật</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="birthday"
                disabled
                defaultValue={
                  organizationManager ? organizationManager.birthday : ""
                }
              />
              <CopyButton
                code={organizationManager ? organizationManager.birthday : ""}
              />
            </div>
          </div>
        </div>
        {organizationManager && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/*  */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_verified"
                checked={formik.values.is_verified}
                onCheckedChange={handleSwitchChange("is_verified")}
              />
              <Label htmlFor="is_verified">Xác thực</Label>
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

export default EditOrganizationManagerForm;
