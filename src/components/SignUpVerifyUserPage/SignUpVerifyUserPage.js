import React from "react";
import SignUpVerifyUserForm from "./SignUpVerifyUserForm/SignUpVerifyUserForm";
import { Helmet } from "react-helmet";

export default function SignUpVerifyUserPage() {
   // Sử dụng useEffect để cuộn trang lên đầu sau khi component được render
   React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn nhẹ
    });
  }, []); // Mảng rỗng đảm bảo rằng hiệu ứng chỉ chạy một lần sau khi component mount

  return <div>
    <Helmet>
      <title>Đăng kí tài khoản thiện nguyện cá nhân • VMO</title>
      <meta
        name="description"
        content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
      />
    </Helmet>
   

    <div className="w-3/4 mx-auto">
    <div className="w-full h-48 tablet:h-60 my-4 flex justify-center rounded-xl shadow overflow-hidden">
        <img
          src={require("../../assets/images/thumbnail6.jpg")}
          className="w-full h-full object-cover "
          alt="ảnh nền"
        />
      </div>

      <div className=" shadow rounded-xl">
        <div className="bg-vmo text-center rounded-tl-xl rounded-tr-xl py-3">
          <span className="text-white text-sm mobile:text-xl font-semibold ">Đăng kí tài khoản thiện nguyện cá nhân</span>
        </div>
        <SignUpVerifyUserForm></SignUpVerifyUserForm>
      </div>



    </div>


  </div>;
}
