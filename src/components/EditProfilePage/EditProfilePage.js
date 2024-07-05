import React from "react";

import EditProfileForm from "./EditProfileForm";
import EditAvatarForm from "./EditAvatarForm";
import { Helmet } from "react-helmet";

export default function EditProfilePage() {
    // Sử dụng useEffect để cuộn trang lên đầu sau khi component được render
    React.useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Tạo hiệu ứng cuộn nhẹ
      });
    }, []); // Mảng rỗng đảm bảo rằng hiệu ứng chỉ chạy một lần sau khi component mount
  return (
    <div>
      <Helmet>
        <title>Chỉnh sửa thông tin cá nhân • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="mb-8 w-full text-center">
        <h1 className="text-xl font-bold my-2">Chỉnh sửa thông tin cá nhân</h1>
      </div>
      <div className="w-3/4 mx-auto">
        <div className="grid gap-6 tablet:grid-cols-2">
          <EditProfileForm></EditProfileForm>
          <EditAvatarForm></EditAvatarForm>
        </div>
      </div>
    </div>
  );
}
