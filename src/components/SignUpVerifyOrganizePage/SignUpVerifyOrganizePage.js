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
  <div className="bg-orange-300 w-full h-14 flex justify-center items-center ">
      <h1 className=" text-sx mobile:text-2xl font-medium">Đăng kí tài khoản "quản lý tổ chức xác thực"</h1>
  </div> 

  <div className="w-3/4 mx-auto">
      {/* <div className="flex justify-center w-full h-52 my-8 " >
          <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" />
      </div> */}
      <div className="w-full h-48 tablet:h-60 my-4 flex justify-center rounded-xl bg-center bg-[url('https://images.pexels.com/photos/5993965/pexels-photo-5993965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-cover" >
          {/* <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" /> */}
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
