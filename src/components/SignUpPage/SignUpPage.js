/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_src from "../../assets/images/banner_v2.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SignUpForm from "./SignUpForm/SignUpForm";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Step, Stepper } from "../ui/stepper";
import OTPInputForm from "./OTPInputForm/OTPInputForm";

const steps = [
  { label: "Nhập thông tin", description: "Nhập đầy đủ thông tin để đăng ký" },
  { label: "OTP", description: "Nhập mã OTP" },
];

const SignUpPage = () => {
  // Sử dụng useEffect để cuộn trang lên đầu sau khi component được render
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn nhẹ
    });
  }, []); // Mảng rỗng đảm bảo rằng hiệu ứng chỉ chạy một lần sau khi component mount
  const [otp, setOTP] = React.useState(null);
  const [signUpInformation, setSignUpInformation] = React.useState(null);
  console.log("OTP nhận được: ", otp);
  console.log("Thông tin đăng ký nhận được: ", signUpInformation);
  console.log("Thông tin đăng ký email: ", signUpInformation?.email)
  return (
    <>
      <Helmet>
        <title>Đăng ký • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="w-full tablet:grid tablet:min-h-[600px] tablet:grid-cols-2 laptop:min-h-[800px]">
        {/* LEFT */}
      <div className="hidden bg-muted tablet:block overflow-hidden min-h-screen">
          <img
            src={img_src}
            alt="Image"
            width="1920"
            height="1080"
            className="w-full object-cover object-center h-full"
          />
        </div>
        {/* RIGHT */}
        <Card className="mx-auto max-w-sm tablet:max-w-screen-tablet laptop:w-[600px] border-none shadow-none flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
            <CardDescription className="text-base">
              Làm theo các bước sau để đăng ký tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper variant="circle-alt" initialStep={0} steps={steps}>
              {steps.map((stepProps, index) => {
                if (index === 0) {
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <SignUpForm
                        setSignUpInformation={setSignUpInformation}
                        setOTP={setOTP}
                      />
                    </Step>
                  );
                }
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <OTPInputForm
                      otp={otp}
                      signUpInformation={signUpInformation}
                    />
                  </Step>
                );
              })}
            </Stepper>
            <div className="mt-4 text-center text-sm">
              Bạn đã có tài khoản ư?{" "}
              <Link to="/login" className="underline">
                Đăng nhập
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;
