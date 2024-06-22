import React from "react";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import img_src from "../../assets/images/placeholder.svg";

const ChangePassswordPage = () => {
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
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePassswordPage;
