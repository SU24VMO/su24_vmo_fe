import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area"

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

const EditStatusForm = ({ isOpen, onOpenChange, organize }) => {
  const { toast } = useToast();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      is_approved: organize ? organize.is_approved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      toast({
        title: "Thông tin duyệt:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-black p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>{" "}
            {/* For testing */}
          </pre>
        ),
      });
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });

  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when organize changes
  React.useEffect(() => {
    setValuesRef.current({
      is_approved: organize ? organize.is_approved : false,
    });
  }, [organize]);

  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt tổ chức</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo tổ chức!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 rounded-xl shadow-inner "> {/* Set a specific height for ScrollArea */}
         <div className="flex flex-col gap-5">
           {/* Show tên tổ chức */}
           <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organization_name">Tên tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organization_name"
                  defaultValue={organize ? organize.organization_name : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.organization_name : ""} />
              </div>
            </div>
          </div>
          {/* Show email tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organization_manager_email">Email</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organization_manager_email"
                  defaultValue={organize ? organize.organization_manager_email : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.organization_manager_email : ""} />
              </div>
            </div>
          </div>
          {/* Show mã số thuế tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organization_tax_code">Mã số thuế</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organization_tax_code"
                  defaultValue={organize ? organize.organization_tax_code : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.organization_tax_code : ""} />
              </div>
            </div>
          </div>
          {/* Show ngày thành lập tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="founding_date">Ngày thành lập</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {organize ? organize.founding_date : ""}
                </Badge>
                <CopyButton
                  code={organize ? organize.founding_date : ""}
                />
              </div>
            </div>
          </div>
          {/* Show mạng xã hội tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="social_media_link">Social Media</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="social_media_link"
                  defaultValue={organize ? organize.social_media_link : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.social_media_link : ""} />
              </div>
            </div>
          </div>
          {/* Show mã số thuế tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="area_of_activity">Lĩnh vực hoạt động</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="area_of_activity"
                  defaultValue={organize ? organize.area_of_activity : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.area_of_activity : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="address">Địa chỉ tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="address"
                  defaultValue={organize ? organize.address : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.address : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="plan_information">Mô tả về tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="plan_information"
                  defaultValue={organize ? organize.plan_information : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.plan_information : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="achievement_link">Thành tích</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="achievement_link"
                  defaultValue={organize ? organize.achievement_link : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.achievement_link : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="authorization_documents">Đơn ủy quyền</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="authorization_documents"
                  defaultValue={organize ? organize.authorization_documents : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.authorization_documents : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="create_date">Đơn được tạo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="create_date"
                  defaultValue={organize ? organize.create_date : ""}
                  disabled
                />
                <CopyButton code={organize ? organize.create_date : ""} />
              </div>
            </div>
          </div>
          {organize && (
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
