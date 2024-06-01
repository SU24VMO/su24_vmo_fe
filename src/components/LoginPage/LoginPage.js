/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_src from "../../assets/images/placeholder.svg";
import LoginForm from "./LoginForm/LoginForm";

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
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
