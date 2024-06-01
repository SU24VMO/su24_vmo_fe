import React from "react";
import SignUpVerifyUserForm from "./SignUpVerifyUserForm/SignUpVerifyUserForm";

export default function SignUpVerifyUserPage() {
  
    return <div>

        <div className="bg-orange-300 w-full h-14 flex justify-center items-center ">
            <h1 className=" text-sx mobile:text-2xl font-medium">Đăng kí tài khoản thiện nguyện cá nhân</h1>
        </div>

        <div className="w-3/4 mx-auto">
            {/* <div className="flex justify-center w-full h-52 my-8 " >
          <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" />
      </div> */}
            <div className="w-full h-48 tablet:h-60 my-4 flex justify-center rounded-xl bg-center bg-contain bg-[url('https://i.pinimg.com/564x/e3/d9/37/e3d937d22fda8243b14f20a955a26f97.jpg')]" >
                {/* <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" /> */}
            </div>



            <div className=" shadow rounded-xl">
                <div className="bg-black text-center rounded-tl-xl rounded-tr-xl py-3">
                    <span className="text-white text-sm mobile:text-xl font-semibold ">Vui lòng điền thông tin bên dưới để chúng tôi có thể tin tưởng bạn!</span>
                </div>
                <SignUpVerifyUserForm></SignUpVerifyUserForm>
            </div>



        </div>


    </div>;
}
