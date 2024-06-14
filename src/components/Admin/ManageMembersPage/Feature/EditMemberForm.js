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
import { Badge } from "../../../ui/badge";
import React from "react";
const EditMemberForm = ({ isOpen, onOpenChange, member }) => {
  const { toast } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      is_verified: member ? member.is_verified : false,
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
  // Update formik initialValues when member changes
  React.useEffect(() => {
    setValuesRef.current({
      is_verified: member ? member.is_verified : false,
    });
  }, [member]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin thành viên</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của thành viên!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
          {/* Show họ thành viên */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="first_name">Họ</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="first_name"
                  defaultValue={member ? member.first_name : ""}
                  disabled
                />
                <CopyButton code={member ? member.first_name : ""} />
              </div>
            </div>
          </div>
          {/* Show tên thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="last_name">Tên</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="last_name"
                  defaultValue={member ? member.last_name : ""}
                  disabled
                />
                <CopyButton code={member ? member.last_name : ""} />
              </div>
            </div>
          </div>
          {/* Show số điện thoại thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="phone_number">Số điện thoại</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="phone_number"
                  defaultValue={member ? member.phone_number : ""}
                  disabled
                />
                <CopyButton code={member ? member.phone_number : ""} />
              </div>
            </div>
          </div>
          {/* Show giới tính thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="gender">Giới tính</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {member
                    ? member.gender === "Male"
                      ? "Nam"
                      : member.gender === "Female"
                      ? "Nữ"
                      : "Khác"
                    : ""}
                </Badge>
                <CopyButton
                  code={
                    member
                      ? member.gender === "Male"
                        ? "Nam"
                        : member.gender === "Female"
                        ? "Nữ"
                        : "Khác"
                      : ""
                  }
                />
              </div>
            </div>
          </div>
          {/* Show năm sinh thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="birthday">Năm sinh</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {member ? member.birthday : ""}
                </Badge>
                <CopyButton code={member ? member.birthday : ""} />
              </div>
            </div>
          </div>
          {/* Show link facebook thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="facebook_url">Link facebook</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="facebook_url"
                  defaultValue={member ? member.facebook_url : ""}
                  disabled
                />
                <CopyButton code={member ? member.facebook_url : ""} />
              </div>
            </div>
          </div>
          {/* Show link youtube thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="youtube_url">Link youtube</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="youtube_url"
                  defaultValue={member ? member.youtube_url : ""}
                  disabled
                />
                <CopyButton code={member ? member.youtube_url : ""} />
              </div>
            </div>
          </div>
          {/* Show link tiktok thành viên */}
          <div className="flex my-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="tiktok_url">Link tiktok</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="tiktok_url"
                  defaultValue={member ? member.tiktok_url : ""}
                  disabled
                />
                <CopyButton code={member ? member.tiktok_url : ""} />
              </div>
            </div>
          </div>
          {member && (
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

export default EditMemberForm;
