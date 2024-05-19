import React from "react";
import { Button } from "../../ui/button";
import UserAvatar from "../Feature/UserAvatar";
import SearchBar from "../Feature/SearchBar";
import Notification from "../Feature/Notification";

const DesktopNavRight = () => {
  return (
    <div className="gap-2 flex items-center">
      {/* Search feature */}
      <SearchBar />
      {/* Avatar with action feature */}
      {/* Sign In feature */}
      <Button className="px-2" variant="outline">
        Đăng nhập
      </Button>
      <Notification />
      <UserAvatar />
    </div>
  );
};

export default DesktopNavRight;
