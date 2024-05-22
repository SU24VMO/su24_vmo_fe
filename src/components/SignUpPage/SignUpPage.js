/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import img_src from "../../assets/images/placeholder.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BirthDayPicker from "./BirthDayPicker/BirthDayPicker";
import GenderSelect from "./GenderSelect/GenderSelect";

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
          <div className="grid gap-4">
            {/* FirstName & LastName */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Họ</Label>
                <Input id="first-name" placeholder="Nguyen" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Tên</Label>
                <Input id="last-name" placeholder="Van A" required />
              </div>
            </div>
            {/* BirthDay & Gender */}
            <div className="grid tablet:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <BirthDayPicker />
              </div>
              <div className="grid gap-2">
                <GenderSelect />
              </div>
            </div>
            {/* UserName */}
            <div className="grid gap-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                required
              />
            </div>
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>
            {/* PhoneNumber */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                type="numberic"
                placeholder="Nhập số điện thoại của bạn"
              />
            </div>
            <Button type="submit" className="w-full">
              Tạo tài khoản
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Bạn đã có tài khoản ư?{" "}
            <a href="#" className="underline">
              Đăng nhập
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
