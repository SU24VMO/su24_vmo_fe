/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_src from "../../assets/images/placeholder.svg";
import NewPasswordInput from "./ResetPasswordFeature/NewPasswordInput";
import { Step, Stepper, useStepper } from "../ui/stepper";
import EmailInput from "./ResetPasswordFeature/EmailInput";
import OTPInput from "./ResetPasswordFeature/OTPInput";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const steps = [
  { label: "Email", description: "Nhập Email" },
  { label: "OTP", description: "Nhập mã OTP" },
  { label: "Mật khẩu mới", description: "Đặt lại mật khẩu" },
];

const ResetPasswordPage = () => {
  const [otp, setOTP] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  console.log("OTP nhận được: ", otp);
  console.log("Email nhận được: ", email);
  return (
    <>
      <Helmet>
        <title>Quên mật khẩu • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="w-full tablet:grid tablet:min-h-[600px] tablet:grid-cols-2 laptop:min-h-[800px]">
        {/* LEFT */}
        <div className="hidden bg-muted tablet:block">
          <img
            src={img_src}
            alt="Image"
            width="1920"
            height="1080"
            className="min-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        {/* RIGHT */}
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid gap-6">
            <Button
              variant={"link"}
              className="text-sm font-normal underline justify-start p-0"
            >
              <ChevronLeft width={16} height={16} className="inline-block" />
              <Link to="/login">Quay lại đăng nhập</Link>
            </Button>
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
                        <EmailInput setOTP={setOTP} setEmail={setEmail} />
                      </Step>
                    );
                  }
                  if (index === 1) {
                    return (
                      <Step key={stepProps.label} {...stepProps}>
                        <OTPInput otp={otp} />
                      </Step>
                    );
                  }
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <NewPasswordInput email={email} />
                    </Step>
                  );
                })}
                <MyStepperSuccess />
              </Stepper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function MyStepperSuccess() {
  const { activeStep, steps } = useStepper();
  if (activeStep !== steps.length) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-5">
      {/* test only */}
      <p className="text-center">
        Đặt lại mật khẩu thành công!🎉 <br /> Vui lòng <b>quay lại đăng nhập</b>{" "}
        tài khoản của bạn lại với mật khẩu mới
      </p>
    </div>
  );
}

export default ResetPasswordPage;
