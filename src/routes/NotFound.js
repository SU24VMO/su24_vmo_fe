import React from "react";
import "./NotFound.css";
import { ReactComponent as Logo } from "../assets/images/logo1.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Không tìm thấy • VMO</title>
        <meta
          name="description"
          content="404 not found - Không tìm thấy trang bạn yêu cầu"
        />
      </Helmet>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="emoji-404">
          <Logo className="w-full h-72" />
        </div>
        <div className="tracking-widest mt-0 text-center">
          <span className="text-gray-500 text-6xl block">404</span>
          <p className="text-2xl">Rất tiếc, trang này không tồn tại</p>
          <p className="text-muted-foreground text-xl">
            Liên kết bạn đã nhấp vào có thể bị hỏng, hoặc trang này có thể đã
            được gỡ bỏ
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="text-gray-500 font-mono font-bold text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </>
  );
}
