import React from "react";
import { Users, HeartHandshake, HandHeart } from "lucide-react";
import CustomCard from "./CustomCard";
import { Button } from "../../ui/button";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const RaiseFundSection = () => {
  const { user } = React.useContext(AuthContext);

  if (user?.role === "Admin") {
    return null;
  } else if (user?.role === "Volunteer") {
    return null;
  } else if (user?.role === "OrganizationManager") {
    return null;
  }
  return (
    <div className="flex-col items-center justify-center mb-10">
      <div className="flex items-center justify-center">
        <hr className="w-[100px] mobile:w-64 h-[1px] mobile:h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
        <p className="text-[10px] mobile:text-lg font-bold px-4 text-center">
          {user?.role === "Member"
            ? "Bạn muốn trở thành tình nguyện viên?"
            : "Gây quỹ từ tài khoản thiện nguyện"}
        </p>
        <hr className="w-[100px] mobile:w-64 h-[1px] mobile:h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
      </div>
      <div className="grid sm:grid-cols-2 tablet:grid-cols-3 items-center gap-6 md:gap-10">
        <CustomCard
          title="Lập tài khoản"
          content="Lập tài khoản tổ chức hoặc tài khoản người dùng trên app VMO để bắt đầu sử dụng các tính năng gây quỹ minh bạch."
          Icon={Users}
        />
        <CustomCard
          title="Tạo chiến dịch"
          content="Thiết kế, quản lý mục tiêu gây quỹ và đăng tải, cập nhật các hoạt động thiện nguyện bằng các thao tác đơn giản."
          Icon={HandHeart}
        />
        <CustomCard
          title="Chia sẻ chiến dịch"
          content="Chia sẻ chiến dịch của bạn tới bạn bè, người thân và cộng đồng thông qua mạng xã hội. Đồng thời kêu gọi sự đồng hành lan tỏa chiến dịch."
          Icon={HeartHandshake}
        />
      </div>
      <div className="mt-10 flex items-center justify-center">
        {user ? (
          <Link to="/createVerifyVolunteer">
            <Button variant="green_theme_primary">
              Trở thành tình nguyện viên
            </Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button variant="green_theme_primary">Đăng ký ngay</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RaiseFundSection;
