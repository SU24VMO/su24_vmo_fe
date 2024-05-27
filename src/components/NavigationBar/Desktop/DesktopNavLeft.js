import React from "react";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const DesktopNavLeft = () => {
  return (
      <div className="mr-4 gap-2 flex items-center">
      <Link to="/">
        <Button variant="outline">VMO-LOGO</Button>
      </Link>
      <Link to="/home">
        <Button variant="ghost">Trang chủ</Button>
      </Link>
      <Link to="/introduction">
        <Button variant="ghost" >Giới thiệu</Button>
      </Link>
      <Link to="/viewCampaigns">
        <Button variant="ghost" >Chiến dịch</Button>
      </Link>
      <Link to="/manage/allCampaigns">
        <Button variant="ghost" >Quản lí</Button>
      </Link>
    </div>
  );
};

export default DesktopNavLeft;
