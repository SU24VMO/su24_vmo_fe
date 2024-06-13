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
import { Badge } from "../../../ui/badge";
import { ScrollArea } from "../../../ui/scroll-area"

import React from "react";
const EditStatusForm = ({ isOpen, onOpenChange, campaign }) => {
  const { toast } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      is_approved: campaign ? campaign.is_approved : false,

    },
    onSubmit: (values, { setSubmitting }) => {
      toast({
        title: "Thông tin duyệt:",
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
  // Update formik initialValues when campaign changes
  React.useEffect(() => {
    setValuesRef.current({
      is_approved: campaign ? campaign.is_approved : false,

    });
  }, [campaign]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
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
          {/* show tên chiến dịch */}
         <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Tên chiến dịch</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="name"
                  defaultValue={campaign ? campaign.name : ""}
                  disabled
                />
                <CopyButton code={campaign ? campaign.name : ""} />
              </div>
            </div>
          </div>
            {/* show thành viên tạo chiến dịch */}
         <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="create_by_user">Tạo bởi thành viên</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="create_by_user"
                  defaultValue={campaign ? campaign.create_by_user : ""}
                  disabled
                />
                <CopyButton code={campaign ? campaign.create_by_user : ""} />
              </div>
            </div>
          </div>
           {/* show tổ chức tạo chiến dịch */}
         <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="create_by_om">Tạo bởi tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="create_by_om"
                  defaultValue={campaign ? campaign.create_by_om : ""}
                  disabled
                />
                <CopyButton code={campaign ? campaign.create_by_om : ""} />
              </div>
            </div>
          </div>
          {/* Show ngày tạo đơn */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="create_date">Ngày thành lập</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {campaign ? campaign.create_date : ""}
                </Badge>
                <CopyButton
                  code={campaign ? campaign.create_date : ""}
                />
              </div>
            </div>
          </div>
          {campaign && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/*  */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_approved"
                checked={formik.values.is_approved}
                onCheckedChange={handleSwitchChange("is_approved")}
              />
              <Label htmlFor="is_approved">Chấp thuận</Label>
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
