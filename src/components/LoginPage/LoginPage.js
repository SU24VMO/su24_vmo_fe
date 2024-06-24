/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import img_src from "../../assets/images/placeholder.svg";
import LoginForm from "./LoginForm/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
const LoginPage = () => {
 const {isLogin} = useContext(AuthContext)
//Check trạng thái login của nó xem login chưa,
//  nếu login rồi sẽ ngăn không cho vào lại trang login ╰(*°▽°*)╯
if(isLogin === true) {
  return <Navigate to="/" />;
}

  return (
    <div className="w-full tablet:grid tablet:min-h-[600px] tablet:grid-cols-2 laptop:min-h-[800px]">
      {/* LEFT */}
      <div className="hidden bg-muted tablet:block">
        <img
          src={img_src}
          alt="Image"
          width="1920"
          height="1080"
          className="min-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
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
