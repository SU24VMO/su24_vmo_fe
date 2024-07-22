/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import img_src from "../../assets/images/banner_v2.png";
import { Helmet } from "react-helmet";

const ChangePassswordPage = () => {
  // Sử dụng useEffect để cuộn trang lên đầu sau khi component được render
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn nhẹ
    });
  }, []); // Mảng rỗng đảm bảo rằng hiệu ứng chỉ chạy một lần sau khi component mount
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
        <div className="flex items-center justify-center py-12">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default ChangePassswordPage;
