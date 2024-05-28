import React from "react";
import { useFormik } from "formik";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";
import { useStepper } from "../../ui/stepper";

const NewPasswordInput = () => {
  const { nextStep } = useStepper();
  const { toast } = useToast();
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
        !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
          values.newPassword
        )
      ) {
        errors.newPassword = "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự. Ví dụ: Abc@1234";
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
      nextStep();
    },
  });

  return (
    <>
      <form className="grid gap-4 mt-3" onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="newPassword">Mật khẩu</Label>
          <Input
            id="newPassword"
            type="newPassword"
            name="newPassword"
            placeholder="Nhập mật khẩu của bạn"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          <p className={cn("text-sm font-medium text-destructive")}>
            {formik.errors.newPassword &&
              formik.touched.newPassword &&
              formik.errors.newPassword}
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmNewPassword">Nhập lại mật khẩu</Label>
          <Input
            id="confirmNewPassword"
            type="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Nhập lại mật khẩu của bạn"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmNewPassword}
          />
          <p className={cn("text-sm font-medium text-destructive")}>
            {formik.errors.confirmNewPassword &&
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword}
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          Xác nhận
        </Button>
      </form>
    </>
  );
};

export default NewPasswordInput;
