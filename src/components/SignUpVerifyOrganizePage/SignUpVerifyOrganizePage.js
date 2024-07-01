import React,{ useEffect} from "react";
import SignUpVerifyOrganizeForm from "./SignUpVerifyOrganizeForm/SignUpVerifyOrganizeForm";
import { Helmet } from "react-helmet";

export default function SignUpVerifyOrganizePage() {
 
  return <div>
    <Helmet>
        <title>Đăng kí tài khoản "quản lý tổ chức xác thực" • VMO</title>
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
              <span className="text-white text-sm mobile:text-xl font-semibold ">Đăng kí tài khoản "quản lý tổ chức xác thực"</span>
          </div>
       <SignUpVerifyOrganizeForm></SignUpVerifyOrganizeForm>
      </div>



  </div>


</div>;
}
