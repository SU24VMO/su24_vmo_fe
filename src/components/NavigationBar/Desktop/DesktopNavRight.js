import React, { useContext, useEffect } from "react";
import { Button } from "../../ui/button";
import UserAvatar from "../Feature/UserAvatar";
import SearchBar from "../Feature/SearchBar";
import Notification from "../Feature/Notification";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const DesktopNavRight = () => {

  const { isLogin } = useContext(AuthContext);
  return (
    <div className="gap-2 flex items-center">
      {/* Search feature */}
      <SearchBar />
      {/* Avatar with action feature */}
      {/* Sign In feature */}
      {isLogin ? "" : <Link to="/login">
        <Button className="px-2" variant="outline">
          Đăng nhập
        </Button>
      </Link>}
      <Notification />
      <UserAvatar />
    </div>
  );
};

export default DesktopNavRight;
