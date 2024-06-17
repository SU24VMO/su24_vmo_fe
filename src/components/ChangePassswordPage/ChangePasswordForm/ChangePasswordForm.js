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
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordForm = () => {
  //State để show/hide password
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);
  
  //Function để toggle show/hide password
  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);

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
    onSubmit: (values, { setSubmitting }) => {
      toast({
        title: "Nội dung vừa nhập:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-black p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>{" "}
            {/* For testing*/}
          </pre>
        ),
      });
      setSubmitting(false);
    },
  });
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
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
            <Button
              className="ml-auto"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Cập nhật mật khẩu
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
