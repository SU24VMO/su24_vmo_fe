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
import { UPDATEAPPROVEOMREQUEST } from "../../../../api/apiConstants";
import { AuthContext } from "../../../../context/AuthContext";
import React, { useContext, useState } from "react";
import { Loader2 } from "lucide-react";


const EditStatusForm = ({ isOpen, onOpenChange, organizationManager, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  console.log(organizationManager);
  const updateStatus = async (data, setSubmitting) => {
    try {
      setLoading(true)

      const response = await axiosPrivate.put(UPDATEAPPROVEOMREQUEST, {
        createOrganizationManagerRequestID: organizationManager.createOrganizationManagerRequestID,
        moderatorId: user.moderator_id,
        isApproved: data.isApproved,
      });

      if (response.status === 200) {
        onSubmitSuccess()
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const serverMessage = error?.response?.data?.message;
        toast({
          variant: "destructive",
          title: "Đã xảy ra lỗi!",
          description: serverMessage,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Đã xảy ra lỗi!",
          description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } finally {
      onOpenChange(false);
      setLoading(false)
      setSubmitting(false)

    }
  }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: organizationManager ? organizationManager.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values.createOrganizationManagerRequestID);
      updateStatus(values, setSubmitting)
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
  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        {organizationManager && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Thông tin đơn duyệt quản lý tổ chức</DialogTitle>
              <DialogDescription>
                Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo quản lý tổ chức!
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[65vh] shadow-inner ">
              <div className="flex flex-col p-5 gap-5">

                {/* Show tên quản lý tổ chức */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="name">Tên quản lý tổ chức</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="name"
                        defaultValue={organizationManager ? organizationManager?.name : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organizationManager ? organizationManager?.name : "Không có"} />
                    </div>
                  </div>
                </div>
                {/* Show sdt quản lý tổ chức */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="phoneNumber"
                        defaultValue={organizationManager ? organizationManager?.phoneNumber : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organizationManager ? organizationManager?.phoneNumber : "Không có"} />
                    </div>
                  </div>
                </div>

                {/* Show sdt quản lý tổ chức */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="email"
                        defaultValue={organizationManager ? organizationManager?.email : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organizationManager ? organizationManager?.email : "Không có"} />
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
                        defaultValue={organizationManager ? organizationManager?.address : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organizationManager ? organizationManager?.address : "Không có"} />
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
                        defaultValue={organizationManager ? organizationManager?.citizenIdentification : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organizationManager ? organizationManager?.citizenIdentification : "Không có"} />
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
                        defaultValue={organizationManager ? organizationManager?.personalTaxCode : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organizationManager ? organizationManager?.personalTaxCode : "Không có"} />
                    </div>
                  </div>
                </div>

                {/* Show Ngày tạo */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="createDate">Ngày tạo yêu cầu</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>

                        {organizationManager?.createDate ? format(new Date(organizationManager?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      </Badge>
                      <CopyButton type="button"
                        code={organizationManager?.createDate ? format(new Date(organizationManager?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
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
                        {organizationManager?.approvedDate ? format(new Date(organizationManager?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      </Badge>
                      <CopyButton type="button"
                        code={organizationManager?.approvedDate ? format(new Date(organizationManager?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      />
                    </div>
                  </div>
                </div>
                {/* Show Người duyệt */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="approvedBy">Người duyệt</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {organizationManager?.moderator ? (organizationManager?.moderator?.firstName + " " + organizationManager?.moderator?.lastName) : "Chưa có"}
                      </Badge>
                      <CopyButton type="button"
                        code={organizationManager?.moderator ? (organizationManager?.moderator?.firstName + " " + organizationManager?.moderator?.lastName) : "Chưa có"}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isApproved"
                      checked={formik.values.isApproved}
                      onCheckedChange={() => handleSwitchChange(true)}
                    />
                    <Label htmlFor="isApproved">Chấp thuận</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isApproved"
                      checked={!formik.values.isApproved}
                      onCheckedChange={() => handleSwitchChange(false)}
                    />
                    <Label htmlFor="isApproved">Từ chối</Label>
                  </div>
                </div>

              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="green_theme_primary"
              >
                {loading ? (
                  <>
                    <Loader2 className="  animate-spin flex items-center justify-center w-full" />

                  </>
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
