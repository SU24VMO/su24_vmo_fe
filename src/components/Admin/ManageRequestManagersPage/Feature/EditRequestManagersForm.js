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
import React from "react";
const EditRequestManagerForm = ({ isOpen, onOpenChange, requestManager }) => {
  const { toast } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      is_active: requestManager ? requestManager.is_active : false,
      is_block: requestManager ? requestManager.is_block : false,
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
      is_active: requestManager ? requestManager.is_active : false,
      is_block: requestManager ? requestManager.is_block : false,
    });
  }, [requestManager]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
    formik.setFieldValue(
      field === "is_active" ? "is_block" : "is_active",
      !isChecked
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin "người quản lý yêu cầu"</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái của "người quản lý yêu cầu"!
          </DialogDescription>
        </DialogHeader>
        {/* Show họ người dùng */}
        <div className="flex">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="first_name">Họ</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="first_name"
                defaultValue={requestManager ? requestManager.first_name : ""}
                disabled
              />
              <CopyButton
                code={requestManager ? requestManager.first_name : ""}
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
                defaultValue={requestManager ? requestManager.last_name : ""}
                disabled
              />
              <CopyButton
                code={requestManager ? requestManager.last_name : ""}
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
                  requestManager ? requestManager.phone_number : ""
                }
                disabled
              />
              <CopyButton
                code={
                  requestManager ? requestManager.phone_number : ""
                }
              />
            </div>
          </div>
        </div>
        {requestManager && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/*  */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formik.values.is_active}
                onCheckedChange={handleSwitchChange("is_active")}
              />
              <Label htmlFor="is_active">Trạng thái</Label>
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

export default EditRequestManagerForm;
