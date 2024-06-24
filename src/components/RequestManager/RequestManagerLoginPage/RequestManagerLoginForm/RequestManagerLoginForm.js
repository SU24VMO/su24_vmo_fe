import React, { useContext } from "react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { useFormik } from "formik";

import { cn } from "../../../../lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { AuthContext } from "../../../../context/AuthContext";

const RequestManagerLoginForm = () => {
  const { loginAction, loading } = useContext(AuthContext);

  //State để show/hide password
  const [showPassword, setShowPassword] = React.useState(false);

  //Function để toggle show/hide password
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.account) {
        errors.account = "Không được để trống!";
      }
      // else if (!values.account) {
      //   errors.account = "Mã xác nhận phải có ít nhất 6 số!"; Để sau này call api lấy account tồn tại
      // }
      if (!values.password) {
        errors.password = "Không được để trống!";
      }
      // else if (!values.password) {
      //   errors.password = "Mã xác nhận phải có ít nhất 6 số!"; Để sau này call api lấy mật khẩu đúng của account
      // }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      loginAction(formik.values.account, formik.values.password);
      setSubmitting(false);
    },
  });
  return (
    <>
      <form
        className="w-full max-w-md m-auto grid gap-6 px-10 mobile:px-0"
        onSubmit={formik.handleSubmit}
      >
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">
              Nhập email và mật khẩu để đăng nhập vào VMO Request Manager!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account">
                Số điện thoại, tên người dùng hoặc email
              </Label>
              <Input
                id="account"
                type="text"
                name="account"
                placeholder="m@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.account}
              />
              <p className={cn("text-sm font-medium text-destructive")}>
                {formik.errors.account &&
                  formik.touched.account &&
                  formik.errors.account}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập password của bạn"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="absolute bottom-1 right-1 h-7 w-7"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              <p className={cn("text-sm font-medium text-destructive")}>
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đăng nhập
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default RequestManagerLoginForm;
