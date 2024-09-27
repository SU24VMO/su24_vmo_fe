import React, { useContext, useState, useRef, useEffect } from "react";
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
import { Badge } from "../../../ui/badge";
import { ScrollArea } from "../../../ui/scroll-area"
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVECAMPAIGNREQUEST } from "../../../../api/apiConstants";
import { AuthContext } from "../../../../context/AuthContext";
import { ImageDown } from "lucide-react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const EditStatusForm = ({ isOpen, onOpenChange, campaigns, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const description = campaigns?.campaign?.description ? (campaigns?.campaign?.description?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có";


  const updateStatus = async (data, setSubmitting) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.put(UPDATEAPPROVECAMPAIGNREQUEST, {
        createCampaignRequestID: campaigns.createCampaignRequestID,
        moderatorId: user.moderator_id,
        isApproved: data.isApproved,
      });

      if (response.status === 200) {
        onSubmitSuccess();
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
      setLoading(false);
      setSubmitting(false)
    }
  };

  const formik = useFormik({
    initialValues: {
      isApproved: campaigns ? campaigns.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatus(values, setSubmitting);
    },
  });

  const setValuesRef = useRef(formik.setValues);

  useEffect(() => {
    setValuesRef.current({
      isApproved: campaigns ? campaigns.isApproved : false,
    });
  }, [campaigns]);

  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };

  const formatAmount = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + " VND";
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        {campaigns && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Thông tin đơn duyệt chiến dịch</DialogTitle>
              <DialogDescription>
                Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của chiến dịch!
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[65vh] shadow-inner">
              <div className="flex flex-col p-5 gap-5">
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="name">Tên chiến dịch</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="name"
                        defaultValue={campaigns?.campaign ? campaigns.campaign?.name : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={campaigns?.campaign ? campaigns.campaign?.name : "Không có"} />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="targetAmount">Mục tiêu</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {campaigns?.campaign ? formatAmount(campaigns.campaign?.targetAmount) : "Không có"}
                      </Badge>
                      <CopyButton type="button"
                        code={campaigns?.campaign ? formatAmount(campaigns.campaign?.targetAmount) : "Không có"}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="image">Ảnh nền</Label>
                    <div className="w-1/3 mx-auto">
                      <img
                        src={campaigns?.campaign ? campaigns.campaign?.image : "Không có"}
                        alt="ảnh-nền"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                      />
                    </div>
                    {campaigns?.campaign && campaigns.campaign?.image && (
                      <a href={campaigns.campaign?.image} download>
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
                    <Label htmlFor="description">Mô tả</Label>
                    <div className="flex items-center space-x-2 text-sm">
                      <div variant={"outline"}>
                        <div dangerouslySetInnerHTML={{ __html: isExpanded ? description : description?.substring(0, 500) + '...' }} />
                        <Button  type="button" variant="link" onClick={toggleDescription}>
                          {isExpanded ? "Thu gọn" : "Xem thêm"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan stage chiến dịch */}

                {(campaigns?.campaign?.campaignTier * 1) === 2 ? (
                  <div className="flex">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="processingPhase">Kế hoạch chi tiêu</Label>
                      <div className="flex items-center space-x-2 text-sm">
                        <ol class="relative border-s border-gray-200 dark:border-gray-700">
                          {
                            campaigns?.campaign?.processingPhases && campaigns?.campaign?.processingPhases.map((stage) => {
                              return (
                                <li class="mb-10 ms-4">
                                  <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  <span class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{stage?.percent + "%"}</span>
                                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{stage?.name + " - " + formatAmount(stage?.currentMoney)}</h3>
                                </li>
                              )
                            })
                          }

                        </ol>
                      </div>
                    </div>
                  </div>
                ) : ""}





                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="address"
                        defaultValue={campaigns?.campaign ? campaigns.campaign?.address : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={campaigns?.campaign ? campaigns.campaign?.address : "Không có"} />
                    </div>
                  </div>
                </div>

                <div className="flex">

                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="applicationConfirmForm">Đơn duyệt từ địa phương</Label>
                    <div className="w-1/3 mx-auto">
                      <img
                        src={campaigns?.campaign ? campaigns.campaign?.applicationConfirmForm : ""}
                        alt="ảnh-nền"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                      />
                    </div>
                    {campaigns?.campaign && campaigns.campaign?.applicationConfirmForm && (
                      <a href={campaigns.campaign?.applicationConfirmForm} download>
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
                    <Label htmlFor="member">Tạo bởi tình nguyện viên</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="member"
                        defaultValue={campaigns?.member ? (campaigns.member?.firstName + " " + campaigns.member?.lastName) : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={campaigns?.member ? (campaigns.member?.firstName + " " + campaigns.member?.lastName) : "Không có"} />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="create_by_om">Tạo bởi quản lý tổ chức</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="create_by_om"
                        defaultValue={campaigns?.organizationManager ? (campaigns.organizationManager?.firstName + " " + campaigns.organizationManager?.lastName) : "Không có"}
                        disabled
                      />
                      <CopyButton type="button" code={campaigns?.organizationManager ? (campaigns.organizationManager?.firstName + " " + campaigns.organizationManager?.lastName) : "Không có"} />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="create_date">Ngày tạo chiến dịch</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {campaigns ? format(new Date(campaigns?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      </Badge>
                      <CopyButton type="button"
                        code={campaigns ? format(new Date(campaigns?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="startDate">Ngày bắt đầu</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {campaigns?.campaign ? format(new Date(campaigns.campaign?.startDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      </Badge>
                      <CopyButton type="button"
                        code={campaigns?.campaign ? format(new Date(campaigns.campaign?.startDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                      />
                    </div>
                  </div>
                </div>

                {(campaigns?.campaign?.campaignTier * 1) === 1 ? (
                  <div className="flex">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="expectedEndDate">Ngày kết thúc giai đoạn ủng hộ (dự kiến)</Label>
                      <div className="flex items-center space-x-2">
                        <Badge variant={"outline"}>
                          {campaigns?.campaign ? format(new Date(campaigns.campaign?.expectedEndDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                        </Badge>
                        <CopyButton type="button"
                          code={campaigns?.campaign ? format(new Date(campaigns.campaign?.expectedEndDate), 'dd/MM/yyyy, h:mm:ss a') : "Không có"}
                        />
                      </div>
                    </div>
                  </div>
                ) : ""}

                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="approved_by">Người duyệt</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {campaigns?.moderator ? (campaigns.moderator?.firstName + " " + campaigns.moderator?.lastName) : "Chưa có"}
                      </Badge>
                      <CopyButton type="button"
                        code={campaigns?.moderator ? (campaigns.moderator?.firstName + " " + campaigns.moderator?.lastName) : "Chưa có"}
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
