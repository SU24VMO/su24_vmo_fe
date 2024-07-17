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
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Loader2 } from "lucide-react";


const EditStatusForm = ({ isOpen, onOpenChange, organize, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);


  const planInformation = organize?.planInformation ? (organize?.planInformation?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có";


  const updateStatus = async (data) => {
    try {
      setLoading(true)

      const response = await axiosPrivate.put(UPDATEAPPROVEORGANIZATIONREQUEST, {
        createOrganizationRequestID: organize.createOrganizationRequestID,
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
  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt tổ chức</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo tổ chức!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[65vh] shadow-inner"> {/* Set a specific height for ScrollArea */}
          <div className="flex flex-col p-5 gap-5">
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
                    {organize ? format(new Date(organize?.foundingDate), 'dd/MM/yyyy') : ""}
                  </Badge>
                  <CopyButton
                    code={organize ? format(new Date(organize?.foundingDate), 'dd/MM/yyyy') : ""}
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
                <div className="flex items-center space-x-2 text-sm">
                  <div variant={"outline"}>
                    <div dangerouslySetInnerHTML={{ __html: isExpanded ? planInformation : planInformation?.substring(0, 500) + '...' }} />
                    <Button variant="link" onClick={toggleDescription}>
                      {isExpanded ? "Thu gọn" : "Xem thêm"}
                    </Button>
                  </div>
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
                <Label htmlFor="organizationManager">Quản lý tổ chức</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="organizationManager"
                    defaultValue={organize?.organizationManager ? (organize.organizationManager?.firstName + organize.organizationManager?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={organize?.organizationManager ? (organize.organizationManager?.firstName + organize.organizationManager?.lastName) : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="createDate">Ngày tạo đơn</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>
                    {organize ? format(new Date(organize?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={organize ? format(new Date(organize?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>
            {organize && (
              <form onSubmit={formik.handleSubmit} className="space-y-3">
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
            {loading ? (
              <>
                <Loader2 className="  animate-spin flex items-center justify-center w-full" />

              </>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
