import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useFormik } from "formik";
import { useToast } from "../../ui/use-toast";
import { cn } from "../../../lib/utils";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axiosInstance";
import {
  CHECK_CURRENT_PASSWORD,
  RESET_PASSWORD,
} from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";
import { ToastAction } from "../../ui/toast";

const ChangePasswordForm = () => {
  const { user } = React.useContext(AuthContext);
  //State để show/hide password
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  // State để loading khi submit form
  const [loading, setLoading] = React.useState(false);
  // Hook để điều hướng trang
  const navigate = useNavigate();

  //Function để toggle show/hide password
  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmNewPasswordVisibility = () =>
    setShowConfirmNewPassword(!showConfirmNewPassword);

  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.currentPassword) {
        errors.currentPassword = "Không được để trống!";
      }
      if (!values.newPassword) {
        errors.newPassword = "Không được để trống!";
      } else if (
        !/(?=(.*[0-9]))(?=.*[@#$%^&*()[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
          values.newPassword
        )
      ) {
        errors.newPassword =
          "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự. Ví dụ: Abc@1234";
      }
      if (!values.confirmNewPassword) {
        errors.confirmNewPassword = "Không được để trống!";
      } else if (values.confirmNewPassword !== values.newPassword) {
        errors.confirmNewPassword = "Mật khẩu không trùng khớp!";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        // Gọi API để kiểm tra mật khẩu hiện tại
        const checkCurrentPasswordResponse = await axiosPrivate.post(
          CHECK_CURRENT_PASSWORD,
          {
            email: user.email,
            oldPassword: values.currentPassword,
          }
        );
        // Kiểm tra kết quả trả về từ API
        if (checkCurrentPasswordResponse.data.data) {
          console.log("====================================");
          console.log("Mật khẩu hiện tại đúng");
          console.log("====================================");
          // Nếu mật khẩu hiện tại đúng, tiếp tục thực hiện logic thay đổi mật khẩu
          // Gọi API thay đổi mật khẩu ở đây
          const response = await axiosPrivate.post(RESET_PASSWORD, {
            email: user.email,
            password: values.newPassword,
          });
          if (response.status === 200) {
            // Hiển thị thông báo thành công
            toast({
              title: "Thay đổi mật khẩu thành công!",
              action: <ToastAction altText="undo">Ẩn</ToastAction>,
            });
            navigate('/home');
          } else {
            // Hiển thị thông báo lỗi
            toast({
              title: "Thay đổi mật khẩu thất bại!",
              description: "Vui lòng thử lại!",
              action: <ToastAction altText="undo">Ẩn</ToastAction>,
            });
          }
        } else {
          // Nếu mật khẩu hiện tại sai, hiển thị thông báo lỗi
          toast({
            variant: "destructive",
            title: "Mật khẩu hiện tại sai !",
            description: "Vui lòng thử lại!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        }
      } catch (error) {
        console.error("There was an error:", error);
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra!",
          description: error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Button
          variant={"link"}
          className="text-sm font-normal justify-start p-0"
        >
          <ChevronLeft width={16} height={16} className="inline-block" />
          <Link to="/">Quay lại</Link>
        </Button>
        <CardTitle>Đổi mật khẩu</CardTitle>
        <CardDescription>
          Hãy chọn hiện mật khẩu để kiểm tra mật khẩu của bạn trước khi hoàn tất
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 mt-3" onSubmit={formik.handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Nhập mật khẩu của bạn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={toggleCurrentPasswordVisibility}
              >
                {showCurrentPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            <p className={cn("text-sm font-medium text-destructive")}>
              {formik.errors.currentPassword &&
                formik.touched.currentPassword &&
                formik.errors.currentPassword}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Nhập mật khẩu của bạn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            <p className={cn("text-sm font-medium text-destructive")}>
              {formik.errors.newPassword &&
                formik.touched.newPassword &&
                formik.errors.newPassword}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmNewPassword">Nhập lại mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="Nhập lại mật khẩu của bạn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmNewPassword}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={toggleConfirmNewPasswordVisibility}
              >
                {showConfirmNewPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            <p className={cn("text-sm font-medium text-destructive")}>
              {formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword}
            </p>
          </div>
          <CardFooter>
            <Button className="ml-auto" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cập nhật mật khẩu
                </>
              ) : (
                "Cập nhật mật khẩu"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
