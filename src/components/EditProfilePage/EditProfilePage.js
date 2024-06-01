import React from "react";

import EditProfileForm from "./EditProfileForm";
import EditAvatarForm from "./EditAvatarForm";

export default function EditProfilePage() {
 


  return (
    <div>
      <div className="mb-8 w-full text-center">
        <h1 className="text-xl font-bold my-2">Chỉnh sửa thông tin cá nhân</h1>
      </div>
      <div className="w-3/4 mx-auto">
        <div className="grid gap-6 tablet:grid-cols-2">
         <EditProfileForm ></EditProfileForm>
          <EditAvatarForm></EditAvatarForm>
        </div>
      </div>
    </div>
  );
}
