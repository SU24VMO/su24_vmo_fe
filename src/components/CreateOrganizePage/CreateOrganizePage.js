import React,{ useEffect} from "react";
import CreateOrganizeForm from "./CreateOrganizeForm/CreateOrganizeForm";
import { Helmet } from "react-helmet";

export default function CreateOrganizePage() {
 
  return <div>
      <Helmet>
        <title>Tạo tổ chức • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
  <div className="bg-orange-300 w-full h-14 flex justify-center items-center ">
      <h1 className=" text-sx mobile:text-2xl font-medium">Đăng kí tạo tổ chức</h1>
  </div>

  <div className="w-3/4 mx-auto">
      {/* <div className="flex justify-center w-full h-52 my-8 " >
          <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" />
      </div> */}
      <div className="w-full h-48 tablet:h-60 my-4 flex justify-center rounded-xl bg-center bg-contain bg-[url('https://i.pinimg.com/564x/a4/65/77/a46577eabca06fc400fc092f89ef9c7e.jpg')]" >
          {/* <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" /> */}
      </div>


      <div className=" shadow rounded-xl">
          <div className="bg-black text-center rounded-tl-xl rounded-tr-xl py-3">
              <span className="text-white text-sm mobile:text-xl font-semibold ">Vui lòng điền thông tin bên dưới để chúng tôi có thể tin tưởng bạn!</span>
          </div>
       <CreateOrganizeForm></CreateOrganizeForm>
      </div>



  </div>


</div>;
}
