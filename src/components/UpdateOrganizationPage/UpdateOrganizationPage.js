import React from "react";
import { Helmet } from "react-helmet";
import UpdateOrganizationForm from "./UpdateOrganizationForm/UpdateOrganizationForm";

export default function UpdateOrganizationPage() {
  return (
    <div>
      <Helmet>
        <title>Tạo tổ chức • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>

      <div className="w-3/4 mx-auto animate-fadeInRight">
        <div className="w-full h-48 tablet:h-60 my-4 flex justify-center rounded-xl shadow overflow-hidden">
          <img
            src={require("../../assets/images/thumbnail4.jpg")}
            className="w-full h-full object-cover "
            alt="ảnh nền"
          />
        </div>

        <div className="shadow rounded-xl">
          <div className="bg-vmo text-center rounded-tl-xl rounded-tr-xl py-3">
            <span className="text-white text-sm mobile:text-2xl font-semibold">
              Đăng kí tạo tổ chức
            </span>
          </div>
          <UpdateOrganizationForm/>
        </div>
      </div>
    </div>
  );
}
