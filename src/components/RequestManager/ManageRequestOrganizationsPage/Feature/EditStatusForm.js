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
import { UPDATEAPPROVEORGANIZATIONREQUEST } from "../../../../api/apiConstants";
import React, {useContext} from "react";
import { AuthContext } from "../../../../context/AuthContext";


const EditStatusForm = ({ isOpen, onOpenChange, organize }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  console.log(organize);
  const updateStatus = async (data) => {
    try {
      const response = await axiosPrivate.put(UPDATEAPPROVEORGANIZATIONREQUEST, {
        createOrganizationRequestID: organize.createOrganizationRequestID,
        requestManagerId: user.request_manager_id,
        isApproved: data.isApproved,
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
      isApproved: organize ? organize.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatus(values)
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });

  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when organize changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: organize ? organize.isApproved : false,
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
        <ScrollArea className="h-96 px-10 py-5 shadow-inner "> {/* Set a specific height for ScrollArea */}
         <div className="flex flex-col gap-5">
           {/* Show tên tổ chức */}
           <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organizationName">Tên tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organizationName"
                  defaultValue={organize ? organize?.organizationName : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.organizationName : ""} />
              </div>
            </div>
          </div>
          {/* Show email tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organizationManagerEmail">Email</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organizationManagerEmail"
                  defaultValue={organize ? organize?.organizationManagerEmail : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.organizationManagerEmail : ""} />
              </div>
            </div>
          </div>
          {/* Show mã số thuế tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organizationTaxCode">Mã số thuế</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organizationTaxCode"
                  defaultValue={organize ? organize?.organizationTaxCode : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.organizationTaxCode : ""} />
              </div>
            </div>
          </div>
          {/* Show ngày thành lập tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="foundingDate">Ngày thành lập</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {organize ? format(new Date(organize?.foundingDate), 'dd/MM/yyyy')  : ""}
                </Badge>
                <CopyButton
                  code={organize ? format(new Date(organize?.foundingDate), 'dd/MM/yyyy')  : ""}
                />
              </div>
            </div>
          </div>
          {/* Show mạng xã hội tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="socialMediaLink">Social Media</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="socialMediaLink"
                  defaultValue={organize ? organize?.socialMediaLink : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.socialMediaLink : ""} />
              </div>
            </div>
          </div>
          {/* Show mã số thuế tổ chức */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="areaOfActivity">Lĩnh vực hoạt động</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="areaOfActivity"
                  defaultValue={organize ? organize?.areaOfActivity : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.areaOfActivity : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="address">Địa chỉ tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="address"
                  defaultValue={organize ? organize?.address : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.address : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="planInformation">Kế hoạch của tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="planInformation"
                  defaultValue={organize ? organize?.planInformation : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.planInformation : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="achievementLink">Thành tích</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="achievementLink"
                  defaultValue={organize ? organize?.achievementLink : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.achievementLink : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="authorizationDocuments">Đơn ủy quyền</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="authorizationDocuments"
                  defaultValue={organize ? organize?.authorizationDocuments : ""}
                  disabled
                />
                <CopyButton code={organize ? organize?.authorizationDocuments : ""} />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organizationManager">Quản lí tổ chức</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organizationManager"
                  defaultValue={organize?.organizationManager ? (organize.organizationManager?.firstName + organize.organizationManager?.lastName ) : ""}
                  disabled
                />
                <CopyButton code={organize?.organizationManager ? (organize.organizationManager?.firstName + organize.organizationManager?.lastName ): ""} />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="createDate">Ngày tạo đơn</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {organize ? format(new Date(organize?.createDate), 'dd/MM/yyyy, h:mm:ss a')  : ""}
                </Badge>
                <CopyButton
                  code={organize ? format(new Date(organize?.createDate), 'dd/MM/yyyy, h:mm:ss a')  : ""}
                />
              </div>
            </div>
          </div>
          {organize && (
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
