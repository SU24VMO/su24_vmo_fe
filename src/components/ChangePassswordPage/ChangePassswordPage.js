/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import img_src from "../../assets/images/placeholder.svg";
import { Helmet } from "react-helmet";

const ChangePassswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Đổi mật khẩu • VMO</title>
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
            className="min-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        {/* RIGHT */}
        <div className="flex items-center justify-center py-12">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default ChangePassswordPage;
