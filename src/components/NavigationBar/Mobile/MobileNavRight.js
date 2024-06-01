import React from "react";
import UserAvatar from "../Feature/UserAvatar";
import Notification from "../Feature/Notification";

const MobileNavRight = () => {
  return (
    <div className="flex gap-x-3 items-center">
      <Notification />
      <UserAvatar />
    </div>
  );
};

export default MobileNavRight;
