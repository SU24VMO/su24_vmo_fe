import React, { useContext } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { AuthContext } from "../../../context/AuthContext";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const { loginAction, loading } = useContext(AuthContext);

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
        className="mx-auto grid gap-6 px-10 mobile:px-0"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Đăng nhập</h1>
          <p className="text-balance text-muted-foreground">
            Nhập số điện thoại, tên người dùng hoặc email để đăng nhập
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link
                to="/resetPassword"
                className="ml-auto inline-block text-sm underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Nhập password của bạn"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <p className={cn("text-sm font-medium text-destructive")}>
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </p>
          </div>
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
        </div>
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản ư?&nbsp;
          <Link to="/signup" className="underline">
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
