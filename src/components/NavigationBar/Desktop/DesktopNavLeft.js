import React from "react";
import { Button } from "../../ui/button";

const DesktopNavLeft = () => {
  return (
    <div className="mr-4 gap-2 flex items-center">
      <Button variant="outline">VMO-LOGO</Button>
      <Button variant="ghost">Trang chủ</Button>
      <Button variant="ghost">Giới thiệu</Button>
      <Button variant="ghost">Chiến dịch</Button>
    </div>
  );
};

export default DesktopNavLeft;
