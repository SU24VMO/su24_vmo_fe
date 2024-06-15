import React from "react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { useFormik } from "formik";
import { useToast } from "../../../ui/use-toast";
import { cn } from "../../../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

const LoginForm = () => {
  const { toast } = useToast();
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
      toast({
        title: "Thông tin đăng nhập:",
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
    <>
      <form
        className="w-full max-w-md m-auto grid gap-6 px-10 mobile:px-0"
        onSubmit={formik.handleSubmit}
      >
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
            Đăng nhập
            </CardTitle>
            <CardDescription className="text-center">
              Nhập email và mật khẩu để đăng nhập vào trang quản lý yêu cầu của VMO!
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default LoginForm;