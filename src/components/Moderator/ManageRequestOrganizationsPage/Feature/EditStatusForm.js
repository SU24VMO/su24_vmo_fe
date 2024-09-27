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
import { ImageDown, Loader2 } from "lucide-react";


const EditStatusForm = ({ isOpen, onOpenChange, organize, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);


  const planInformation = organize?.planInformation ? (organize?.planInformation?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có";


  const updateStatus = async (data, setSubmitting) => {
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
      setSubmitting(false)

    }
  }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: organize ? organize.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatus(values, setSubmitting)
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
        {organize && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Thông tin đơn duyệt tổ chức</DialogTitle>
              <DialogDescription>
                Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo tổ chức!
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[65vh] shadow-inner"> {/* Set a specific height for ScrollArea */}

              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="image">Ảnh Logo</Label>
                  <div className="w-1/3 mx-auto">
                    <img
                      src={organize?.organization ? organize?.organization?.logo : "Không có"}
                      alt="ảnh-nền"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                    />
                  </div>
                  {organize?.organization && organize.organization?.logo && (
                    <a href={organize.organization?.logo} download>
                      <Button
                       type="button"
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <ImageDown className="h-6 w-6" />
                        Tải về
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                {/* Show tên tổ chức */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="organizationName">Tên tổ chức</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="organizationName"
                        defaultValue={organize ? organize?.organizationName : "Không cóKhông có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.organizationName : "Không cóKhông có"} />
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
                        defaultValue={organize ? organize?.organizationManagerEmail : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.organizationManagerEmail : "Không có"} />
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
                        defaultValue={organize ? organize?.organizationTaxCode : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.organizationTaxCode : "Không có"} />
                    </div>
                  </div>
                </div>
                {/* Show ngày thành lập tổ chức */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="foundingDate">Ngày thành lập</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {organize ? format(new Date(organize?.foundingDate), 'dd/MM/yyyy') : "Không có"}
                      </Badge>
                      <CopyButton type="button"
                        code={organize ? format(new Date(organize?.foundingDate), 'dd/MM/yyyy') : "Không có"}
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
                        defaultValue={organize ? organize?.socialMediaLink : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.socialMediaLink : "Không có"} />
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
                        defaultValue={organize ? organize?.areaOfActivity : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.areaOfActivity : "Không có"} />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="address">Địa chỉ tổ chức</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="address"
                        defaultValue={organize ? organize?.address : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.address : "Không có"} />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="planInformation">Kế hoạch của tổ chức</Label>
                    <div className="flex items-center space-x-2 text-sm break-all">
                      <div variant={"outline"}>
                        <div dangerouslySetInnerHTML={{ __html: isExpanded ? planInformation : planInformation?.substring(0, 500) + '...' }} />
                        <Button  type="button" variant="link" onClick={toggleDescription}>
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
                        defaultValue={organize ? organize?.achievementLink : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize ? organize?.achievementLink : "Không có"} />
                    </div>
                  </div>
                </div>
                {/* <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="authorizationDocuments">Đơn ủy quyền</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="authorizationDocuments"
                    defaultValue={organize ? organize?.authorizationDocuments : ""}
                    disabled
                  />
                  <CopyButton type="button" code={organize ? organize?.authorizationDocuments : ""} />
                </div>
              </div>
            </div> */}

                <div className="flex flex-col p-5 gap-5">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="authorizationDocuments">Đơn ủy quyền</Label>
                    <div className="w-1/3 mx-auto">
                      <img
                        src={organize ? organize?.authorizationDocuments : "Không có"}
                        alt="anh-uy-quyen"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                      />
                    </div>
                    {organize && organize?.authorizationDocuments && (
                      <a href={organize?.authorizationDocuments} download>
                        <Button
                         type="button"
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          <ImageDown className="h-6 w-6" />
                          Tải về
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="organizationManager">Quản lý tổ chức</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="organizationManager"
                        defaultValue={organize?.organizationManager ? (organize.organizationManager?.firstName + organize.organizationManager?.lastName) : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={organize?.organizationManager ? (organize.organizationManager?.firstName + organize.organizationManager?.lastName) : "Không có"} />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="createDate">Ngày tạo đơn</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {organize?.createDate ? format(new Date(organize?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      </Badge>
                      <CopyButton type="button"
                        code={organize?.createDate ? format(new Date(organize?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="approvedDate">Ngày duyệt </Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {organize?.approvedDate ? format(new Date(organize?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      </Badge>
                      <CopyButton type="button"
                        code={organize?.approvedDate ? format(new Date(organize?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
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
