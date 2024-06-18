import React, { useContext } from "react";
import UserAvatar from "../Feature/UserAvatar";
import Notification from "../Feature/Notification";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const MobileNavRight = () => {
  const { user, isLogin } = useContext(AuthContext);
  return (
    <div className="flex gap-x-3 items-center">
      {isLogin ? (
        ""
      ) : (
        <Link to="/login">
          <Button className="px-2" variant="outline">
            Đăng nhập
          </Button>
        </Link>
      )}
      {/* Check user role */}
      {user?.role === "Member" ||
      user?.role === "OrganizationManager" ||
      user?.role === "User" ? (
        <>
          {/* Notification feature */}
          <Notification />
          {/* Avatar with action feature */}
          <UserAvatar />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MobileNavRight;
