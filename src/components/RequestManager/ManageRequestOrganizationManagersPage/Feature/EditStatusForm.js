import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area"
import { format } from "date-fns";

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
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVEOMREQUEST  } from "../../../../api/apiConstants";
import React from "react";

const EditStatusForm = ({ isOpen, onOpenChange, organizationManager }) => {
  const { toast } = useToast();
  console.log(organizationManager);
  const updateStatus = async (createOrganizationManagerRequestID, isApproved) => {
    try {
      const response = await axiosPrivate.put( UPDATEAPPROVEOMREQUEST, {
        createOrganizationManagerRequestID: createOrganizationManagerRequestID,
        isApproved: isApproved,
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
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: organizationManager ? organizationManager.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values.createOrganizationManagerRequestID);
      updateStatus(organizationManager.createOrganizationManagerRequestID, values.isApproved)
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });

  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when organizationManager changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: organizationManager ? organizationManager.isApproved : false,
    });
  }, [organizationManager]);

  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt quản lí tổ chức</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo quản lí tổ chức!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 shadow-inner "> {/* Set a specific height for ScrollArea */}
         <div className="flex flex-col gap-5">
          
           {/* Show tên quản lí tổ chức */}
           <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Tên quản lí tổ chức</Label>
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
          {/* Show sdt quản lí tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="phoneNumber"
                  defaultValue={organizationManager ? organizationManager.phoneNumber : ""}
                  disabled
                />
                <CopyButton code={organizationManager ? organizationManager.phoneNumber : ""} />
              </div>
            </div>
          </div>
          {/* Show mã số thuế  */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="address"
                  defaultValue={organizationManager ? organizationManager.address : ""}
                  disabled
                />
                <CopyButton code={organizationManager ? organizationManager.address : ""} />
              </div>
            </div>
          </div>
          {/* Show mã CCCD  */}

          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="citizenIdentification">CCCD</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="citizenIdentification"
                  defaultValue={organizationManager ? organizationManager.citizenIdentification : ""}
                  disabled
                />
                <CopyButton code={organizationManager ? organizationManager.citizenIdentification : ""} />
              </div>
            </div>
          </div>
                    {/* Show Mã số thuế cá nhân */}

          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="personalTaxCode">Mã số thuế cá nhân</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="personalTaxCode"
                  defaultValue={organizationManager ? organizationManager.personalTaxCode : ""}
                  disabled
                />
                <CopyButton code={organizationManager ? organizationManager.personalTaxCode : ""} />
              </div>
            </div>
          </div>
          {/* Show Duyệt bởi */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="approvedBy">Duyệt bởi</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {organizationManager ? organizationManager.approvedBy : ""}
                </Badge>
                <CopyButton
                  code={organizationManager ? organizationManager.approvedBy : ""}
                />
              </div>
            </div>
          </div>
          {/* Show Ngày tạo */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="createDate">Ngày tạo yêu cầu</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
             
                  {organizationManager ?  format(new Date(organizationManager.createDate), 'MMMM do yyyy, h:mm:ss a') : ""}
                </Badge>
                <CopyButton
                  code={organizationManager ? format(new Date(organizationManager.createDate), 'MMMM do yyyy, h:mm:ss a') : ""}
                />
              </div>
            </div>
          </div>
            {/* Show ngày duyệt*/}
            <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="approvedDate">Ngày duyệt</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {organizationManager ? format(new Date(organizationManager.approvedDate), 'MMMM do yyyy, h:mm:ss a') : ""}
                </Badge>
                <CopyButton
                  code={organizationManager ? format(new Date(organizationManager.approvedDate), 'MMMM do yyyy, h:mm:ss a') : ""}
                />
              </div>
            </div>
          </div>
          
          {organizationManager && (
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
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
