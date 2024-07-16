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
import { ToastAction } from "../../../ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVEVOLUNTEERREQUEST } from "../../../../api/apiConstants";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Loader2 } from "lucide-react";

const EditStatusForm = ({ isOpen, onOpenChange, volunteer, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  console.log(volunteer);
  const updateStatus = async (data) => {
    try {
      setLoading(true)
      const response = await axiosPrivate.put(UPDATEAPPROVEVOLUNTEERREQUEST, {
        createVolunteerRequestID: volunteer.createVolunteerRequestID,
        moderatorId: user.moderator_id,
        isApproved: data.isApproved,
      });

      if (response.status === 200) {
       onSubmitSuccess()
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
      onOpenChange(false);
      setLoading(false)

    }
  }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: volunteer ? volunteer.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatus(values)
      setSubmitting(false);
    },
  });

  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when volunteer changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: volunteer ? volunteer.isApproved : false,
    });
  }, [volunteer]);

  // Handle switch change
  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt thành viên</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo thành viên!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[65vh] shadow-inner"> {/* Set a specific height for ScrollArea */}
          <div className="flex flex-col  p-5 gap-5">
            {/* Show tên thành viên */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="memberName">Tên thành viên</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="memberName"
                    defaultValue={volunteer ? volunteer.memberName : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.memberName : ""} />
                </div>
              </div>
            </div>
            {/* Show email thành viên */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="email"
                    defaultValue={volunteer ? volunteer.email : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.email : ""} />
                </div>
              </div>
            </div>

            {/* Show volunteerAddress thành viên */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="memberAddress">Địa chỉ</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="memberAddress"
                    defaultValue={volunteer ? volunteer.memberAddress : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.memberAddress : ""} />
                </div>
              </div>
            </div>

             {/* Show volunteerAddress thành viên */}
             <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="citizenIdentification">CCCD</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="citizenIdentification"
                    defaultValue={volunteer ? volunteer.citizenIdentification : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.citizenIdentification : ""} />
                </div>
              </div>
            </div>

       {/* Show Ngày sinh*/}
       <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="birthday">Ngày sinh</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
             
                  {volunteer ?  format(new Date(volunteer?.birthday), 'dd/MM/yyyy') : ""}
                </Badge>
                <CopyButton
                  code={volunteer ? format(new Date(volunteer?.birthday), 'dd/MM/yyyy') : ""}
                />
              </div>
            </div>
          </div>

            {/* Show mã số thuế thành viên
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="organization_tax_code">Mã số thuế</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="organization_tax_code"
                  defaultValue={volunteer ? volunteer.organization_tax_code : ""}
                  disabled
                />
                <CopyButton code={volunteer ? volunteer.organization_tax_code : ""} />
              </div>
            </div>
          </div> */}
         
            {/* Show mạng xã hội thành viên */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="socialMediaLink">Mạng xã hội</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="socialMediaLink"
                    defaultValue={volunteer ? volunteer.socialMediaLink : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.socialMediaLink : ""} />
                </div>
              </div>
            </div>


            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="clubName">Tên CLB thiện nguyện(Đã hoặc đang tham gia)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="clubName"
                    defaultValue={volunteer ? volunteer.clubName : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.clubName : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="roleInClub">Vai trò trong CLB</Label>
                <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                {volunteer ? (volunteer.roleInClub === 0 ? "Sáng lập" : volunteer.roleInClub === 1 ? "Chủ nhiệm" : "Không có") : "Không có"}

                </Badge>
                  <CopyButton code={volunteer ? volunteer.roleInClub : ""} />
                </div>
              </div>
            </div>




            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="achievementLink">Thành tích trước đó</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="achievementLink"
                    defaultValue={volunteer ? volunteer.achievementLink : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.achievementLink : ""} />
                </div>
              </div>
            </div>


          
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="detailDescriptionLink">Đường dẫn/link. . .mô tả, giới thiệu hoạt động, kinh nghiệm, kế hoạch thiện nguyện, cộng đồng đã triển khai</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="detailDescriptionLink"
                    defaultValue={volunteer ? volunteer.detailDescriptionLink : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.detailDescriptionLink : ""} />
                </div>
              </div>
            </div>
            {/* <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="achievement_link">Thành tích</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="achievement_link"
                    defaultValue={volunteer ? volunteer.achievement_link : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.achievement_link : ""} />
                </div>
              </div>
            </div> */}
            {/* <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="authorization_documents">Đơn ủy quyền</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="authorization_documents"
                    defaultValue={volunteer ? volunteer.authorization_documents : ""}
                    disabled
                  />
                  <CopyButton code={volunteer ? volunteer.authorization_documents : ""} />
                </div>
              </div>
            </div> */}
             {/* Show Ngày tạo */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="createDate">Ngày tạo yêu cầu</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
             
                  {volunteer ?  format(new Date(volunteer?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                </Badge>
                <CopyButton
                  code={volunteer ? format(new Date(volunteer?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                />
              </div>
            </div>
          </div>
          {volunteer && (
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
