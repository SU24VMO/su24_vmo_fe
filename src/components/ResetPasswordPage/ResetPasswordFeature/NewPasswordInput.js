import React from "react";
import { useFormik } from "formik";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";
import { useStepper } from "../../ui/stepper";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ToastAction } from "../../ui/toast";
import { axiosPublic } from "../../../api/axiosInstance";
import { FORGOT_PASSWORD_RESET_PASSWORD } from "../../../api/apiConstants";

const NewPasswordInput = ({ email }) => {
  //State để show/hide password
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  // State để show/hide loading
  const [loading, setLoading] = React.useState(false);

  //Function để toggle show/hide password
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmNewPasswordVisibility = () =>
    setShowConfirmNewPassword(!showConfirmNewPassword);

  const { nextStep } = useStepper();
  const { toast } = useToast();

  // Handle form submission
  async function handleSubmit(values, setSubmitting, setLoading) {
    try {
      toast({
        title: "Đang thay đổi mật khẩu mới!",
        description: "Vui chờ trong giây lát!",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      setLoading(true); // Start loading
      const response = await axiosPublic.post(`${FORGOT_PASSWORD_RESET_PASSWORD}`, {
        email: email,
        password: values.newPassword,
      });
      if (response.status === 200) {
        toast({
          title: "Đã đổi mật khẩu thành công!",
          description: "Vui lòng quay lại đăng nhập tài khoản!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.log("Get OTP successfully: ", response.data);
        nextStep(); // Move to the next step
      } else {
        // Handle any other status code appropriately
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra !",
          description: "Vui lòng thử lại!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.log("Failed to update profile");
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra !",
        description: "Vui lòng thử lại!",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      console.error("Error get OTP:", error);
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
      setSubmitting(false); // Set Formik submitting to false
    }
  }

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values) => {
      const errors = {};
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
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting, setLoading);
    },
  });

  return (
    <>
      <form className="grid gap-4 mt-3" onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="newPassword">Mật khẩu</Label>
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
          <Label htmlFor="confirmNewPassword">Nhập lại mật khẩu</Label>
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
        <Button variant="green_theme_primary" type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Xác nhận
            </>
          ) : (
            "Xác nhận"
          )}
        </Button>
      </form>
    </>
  );
};

export default NewPasswordInput;
