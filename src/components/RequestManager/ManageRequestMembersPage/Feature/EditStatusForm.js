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
import { UPDATEAPPROVEMEMBERREQUEST } from "../../../../api/apiConstants";
import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const EditStatusForm = ({ isOpen, onOpenChange, member, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  console.log(member);
  const updateStatus = async (data) => {
    try {
      const response = await axiosPrivate.put(UPDATEAPPROVEMEMBERREQUEST, {
        createMemberRequestID: member.createMemberRequestID,
        requestManagerId: user.request_manager_id,
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

    }
  }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: member ? member.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      updateStatus(values)
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });

  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when member changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: member ? member.isApproved : false,
    });
  }, [member]);

  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet">
        <DialogHeader>
          <DialogTitle>Thông tin đơn duyệt thành viên</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của đơn tạo thành viên!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 px-10 py-5 shadow-inner "> {/* Set a specific height for ScrollArea */}
          <div className="flex flex-col gap-5">
            {/* Show tên thành viên */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="memberName">Tên thành viên</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="memberName"
                    defaultValue={member ? member.memberName : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.memberName : ""} />
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
                    defaultValue={member ? member.email : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.email : ""} />
                </div>
              </div>
            </div>

            {/* Show memberAddress thành viên */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="memberAddress">Địa chỉ</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="memberAddress"
                    defaultValue={member ? member.memberAddress : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.memberAddress : ""} />
                </div>
              </div>
            </div>

       {/* Show Ngày sinh*/}
       <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="birthday">Ngày sinh</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
             
                  {member ?  format(new Date(member?.birthday), 'dd/MM/yyyy') : ""}
                </Badge>
                <CopyButton
                  code={member ? format(new Date(member?.birthday), 'dd/MM/yyyy') : ""}
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
                  defaultValue={member ? member.organization_tax_code : ""}
                  disabled
                />
                <CopyButton code={member ? member.organization_tax_code : ""} />
              </div>
            </div>
          </div> */}
            {/* Show ngày thành lập thành viên
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="founding_date">Ngày thành lập</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
                  {member ? member.founding_date : ""}
                </Badge>
                <CopyButton
                  code={member ? member.founding_date : ""}
                />
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
                    defaultValue={member ? member.socialMediaLink : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.socialMediaLink : ""} />
                </div>
              </div>
            </div>


            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="clubName">Tên CLB thiện nguyện(Đã hoặc đang tham gia)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="clubName"
                    defaultValue={member ? member.clubName : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.clubName : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="roleInClub">Vai trò trong CLB</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="roleInClub"
                    defaultValue={member ? member.roleInClub : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.roleInClub : ""} />
                </div>
              </div>
            </div>




            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="achievementLink">Đường dẫn mô tả một số hoạt động thiện nguyện trước đó</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="achievementLink"
                    defaultValue={member ? member.achievementLink : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.achievementLink : ""} />
                </div>
              </div>
            </div>


          
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="detailDescriptionLink">Mô tả về hoạt động tương lai</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="detailDescriptionLink"
                    defaultValue={member ? member.detailDescriptionLink : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.detailDescriptionLink : ""} />
                </div>
              </div>
            </div>
            {/* <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="achievement_link">Thành tích</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="achievement_link"
                    defaultValue={member ? member.achievement_link : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.achievement_link : ""} />
                </div>
              </div>
            </div> */}
            {/* <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="authorization_documents">Đơn ủy quyền</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="authorization_documents"
                    defaultValue={member ? member.authorization_documents : ""}
                    disabled
                  />
                  <CopyButton code={member ? member.authorization_documents : ""} />
                </div>
              </div>
            </div> */}
             {/* Show Ngày tạo */}
          <div className="flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="createDate">Ngày tạo yêu cầu</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={"outline"}>
             
                  {member ?  format(new Date(member?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                </Badge>
                <CopyButton
                  code={member ? format(new Date(member?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                />
              </div>
            </div>
          </div>
            {member && (
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
