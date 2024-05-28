/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_src from "../../assets/images/placeholder.svg";
import NewPasswordInput from "./ResetPasswordFeature/NewPasswordInput";
import { Step, Stepper, useStepper } from "../ui/stepper";
import EmailInput from "./ResetPasswordFeature/EmailInput";
import OTPInput from "./ResetPasswordFeature/OTPInput";
import { Button } from "../ui/button";

const steps = [
  { label: "Email", description: "Nhập Email" },
  { label: "OTP", description: "Nhập mã OTP" },
  { label: "New Password", description: "Đặt lại mật khẩu" },
];

const ResetPasswordPage = () => {
  return (
    <div className="w-full tablet:grid tablet:min-h-[600px] tablet:grid-cols-2 laptop:min-h-[800px]">
      {/* LEFT */}
      <div className="hidden bg-muted tablet:block">
        <img
          src={img_src}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      {/* RIGHT */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Đặt lại mật khẩu</h1>
            <p className="text-balance text-muted-foreground">
              Bạn hãy làm theo các bước bên trên để đặt lại mật khẩu
            </p>
          </div>
          <div className="max-w-sm">
            <Stepper variant="circle-alt" initialStep={0} steps={steps}>
              {steps.map((stepProps, index) => {
                if (index === 0) {
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <EmailInput />
                    </Step>
                  );
                }
                if (index === 1) {
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <OTPInput />
                    </Step>
                  );
                }
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <NewPasswordInput />
                  </Step>
                );
              })}
              <MyStepperSuccess />
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  );
};

function MyStepperSuccess() {
  const { activeStep, resetSteps, steps } = useStepper();
  if (activeStep !== steps.length) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-5">
      <p className="text-balance text-muted-foreground">
        🎉Chúc mừng bạn đã đặt lại mật khẩu thành công!
      </p>
      {/* test only */}
      <Button onClick={resetSteps}>Quay lại đăng nhập</Button>
    </div>
  );
}

export default ResetPasswordPage;
