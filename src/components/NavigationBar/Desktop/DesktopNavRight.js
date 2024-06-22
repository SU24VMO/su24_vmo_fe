import React, { useContext, useEffect } from "react";
import { Button } from "../../ui/button";
import UserAvatar from "../Feature/UserAvatar";
import SearchBar from "../Feature/SearchBar";
import Notification from "../Feature/Notification";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const DesktopNavRight = () => {
  const { isLogin, user } = useContext(AuthContext);
  return (
    <div className="gap-2 flex items-center">
      {/* Search feature */}
      <SearchBar />

      {/* Sign In feature */}
      {isLogin && user.role !== "Admin" && user.role !== "RequestManager" ? (
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

export default DesktopNavRight;
