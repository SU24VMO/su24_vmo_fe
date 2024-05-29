import React from "react";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useFormik } from "formik";
import { cn } from "../../../lib/utils";
import { useToast } from "../../ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../ui/input-otp";
import { useStepper } from "../../ui/stepper";

const OTPInput = () => {
  const { nextStep } = useStepper();
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.otp) {
        errors.otp = "Không được để trống!";
      } else if (!/^[0-9]{6}$/i.test(values.otp)) {
        errors.otp = "Mã xác nhận phải có ít nhất 6 số!";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      toast({
        title: "Mã xác nhận vừa nhập:",
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
  const handleOTPChange = (otp) => {
    // Create a fake event object
    const event = {
      target: {
        name: "otp",
        value: otp,
      },
    };
    // Call formik.handleChange with the fake event object
    formik.handleChange(event);
  };
  return (
    <form className="grid gap-4 mt-3" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="otp">Nhập mã xác nhận OTP</Label>
        <InputOTP
          maxLength={6}
          value={formik.values.otp}
          onChange={handleOTPChange}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-muted-foreground text-sm">
          Vui lòng nhập đúng mã xác nhận OTP đã được gửi đến email của bạn
        </p>
        <p className={cn("text-sm font-medium text-destructive")}>
          {formik.errors.otp && formik.touched.otp && formik.errors.otp}
        </p>
      </div>
      <Button type="submit" disabled={formik.isSubmitting}>
        Xác nhận
      </Button>
    </form>
  );
};

export default OTPInput;
