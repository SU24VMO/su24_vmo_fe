/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import img_src from "../../assets/images/placeholder.svg";

const LoginPage = () => {
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
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <a
                  href="/resetPassword"
                  className="ml-auto inline-block text-sm underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản ư?&nbsp;
            <a href="/signup" className="underline">
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
