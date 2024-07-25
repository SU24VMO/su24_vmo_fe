/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "../../assets/images/512x512.svg";
import facebookIcon from "../../assets/icons/FacebookIcon.svg"; 
import gmailIcon from "../../assets/icons/EmailIcon.svg"; 


const Footer = () => {
  return (
    <div className="bg-green-theme-primary pt-20 pb-10 relative tablet:px-24 px-5">
      <div className="bg-[url('/src/assets/images/Footer_OB_Pattern-Bg.png')] bg-no-repeat bg-cover opacity-100 mix-blend-multiply bg-center absolute w-full h-full top-0 left-0 pointer-events-none"></div>
      <div className="relative w-full max-w-screen-desktop pt-12 border border-solid border-[#E7E7E759] border-x-0 border-b-0">
        <div className="flex flex-col-reverse gap-y-10 mobile:gap-y-0 mobile:flex-row mobile:items-center mobile:justify-between">
          {/* LEFT */}
          <div className="flex flex-col lg:items-start justify-center tablet:flex-none tablet:px-0">
            <div className="flex flex-col gap-y-3 flex-wrap items-start lg:flex-none lg:items-start">
              <Link to={"/"} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={logo} />
                  <AvatarFallback>VMO</AvatarFallback>
                </Avatar>
                <span className="text-lg font-bold text-white hover:text-[#7cff77] transition-all duration-500">
                  VMO
                </span>
              </Link>
              <p className="font-normal text-white text-xs target:text-base">
                Bản quyền © VMO. 2024 Bảo lưu mọi quyền.
              </p>
            </div>
            <div className="py-[10px] overflow-hidden">
              <ul className="flex items-center list-none m-0 text-white text-xs lg:text-base space-x-4">
                <Link to={"/terms"}>
                  <li className="text-xs mobile:text-base hover:text-[#7cff77] transition-all duration-500">
                    Điều khoản sử dụng
                  </li>
                </Link>
                <li className="text-base">|</li>
                <Link to={"/introduction"}>
                  <li className="text-xs mobile:text-base hover:text-[#7cff77] transition-all duration-500">
                    Giới thiệu về chúng tôi
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          {/* RIGHT */}
          <div className="flex flex-col lg:items-start justify-center tablet:flex-none tablet:px-0">
            <div className="flex flex-col flex-wrap items-start lg:flex-none lg:items-start">
              <p className="font-normal text-white text-xs target:text-base leading-relaxed">
                Những chia sẻ hay phản hồi của bạn về nền tảng VMO <br /> sẽ
                giúp chúng tôi phát triển hơn, 
                vui lòng liên hệ với chúng tôi qua <br /> Facebook hoặc gửi mail
                về địa chỉ vmoorganization@gmail.com.
              </p>
            </div>
            <div className="py-[10px] overflow-hidden">
              <ul className="flex mobile:flex-row list-none m-0 text-white text-xs lg:text-base space-x-4">
                <li className="text-base hover:text-[#7cff77] transition-all duration-500">
                  <a href="https://www.facebook.com/vmoorganization/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={facebookIcon}/>
                      <AvatarFallback>Fb</AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-bold text-white hover:text-[#7cff77] transition-all duration-500">
                      Facebook
                    </span>
                  </a>
                </li>
                <a href="mailto:vmoorganization@gmail.com" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Avatar className="rounded-none overflow-auto">
                    <AvatarImage src={gmailIcon} />
                    <AvatarFallback>Email</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-bold text-white hover:text-[#7cff77] transition-all duration-500">
                    Email
                  </span>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
