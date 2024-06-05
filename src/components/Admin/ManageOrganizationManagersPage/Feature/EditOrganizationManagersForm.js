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
const EditOrganizationManagerForm = ({ isOpen, onOpenChange, organizationManager }) => {
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
          <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái của người dùng!
          </DialogDescription>
        </DialogHeader>
        {/* Show avatar người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="avatar">Avatar</Label>
            <div className="flex items-center space-x-2">
              <Avatar className="w-20 h-20">
                <AvatarImage src={organizationManager ? organizationManager.avatar : ""} alt="@avatar" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
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
                defaultValue={organizationManager ? organizationManager.username : ""}
                disabled
              />
              <CopyButton code={organizationManager ? organizationManager.username : ""} />
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
                defaultValue={organizationManager ? organizationManager.email : ""}
                disabled
              />
              <CopyButton code={organizationManager ? organizationManager.email : ""} />
            </div>
          </div>
        </div>
        {/* Tên công ty */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Tên công ty</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="name"
                defaultValue={organizationManager ? organizationManager.name : ""}
                disabled
              />
              <CopyButton code={organizationManager ? organizationManager.name : ""} />
            </div>
          </div>
        </div>
        {/* Show ngày tạo */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="create_at">Ngày tạo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="create_at"
                disabled
                defaultValue={organizationManager ? organizationManager.create_at : ""}
              />
              <CopyButton code={organizationManager ? organizationManager.create_at : ""} />
            </div>
          </div>
        </div>
        {organizationManager && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/*  */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_block"
                checked={formik.values.is_block}
                onCheckedChange={handleSwitchChange("is_block")}
              />
              <Label htmlFor="is_block">Đang hoạt động</Label>
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

export default EditOrganizationManagerForm;
