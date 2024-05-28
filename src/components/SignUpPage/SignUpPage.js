/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_src from "../../assets/images/placeholder.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SignUpForm from "./SignUpForm/SignUpForm";

const SignUpPage = () => {
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
      <Card className="mx-auto max-w-sm tablet:max-w-screen-tablet laptop:w-[600px] border-none shadow-none flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Đăng Ký</CardTitle>
          <CardDescription className="text-base">
            Điền vào thông tin của bạn để tạo tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <div className="mt-4 text-center text-sm">
            Bạn đã có tài khoản ư?{" "}
            <a href="/login" className="underline">
              Đăng nhập
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
