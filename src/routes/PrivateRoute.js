import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isAllowed = allowedRoles.includes(user?.role); // check xem có những thằng nào được phép vào cái page đó ko

  // vd: user?.role của mình khi login vào là User
 //  các nhánh cho phép sử dụng bao gồm có ["User", "Member"] => có chứ User ở trổng là zô được page đó
//  => xem ở App.js để thấy cái mảng ["User", "Member", "OrganizationManager"]

  if (!user) {
    // Nếu chưa login, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAllowed) {
    // Nếu có login nhưng vai trò không được phép, chuyển hướng đến trang unauthorized (vì không có vai trò sử dụng page này)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Nếu có user và vai trò được phép, hiển thị các thành phần con
  return <Outlet />; //Outlet là cái thành phần sẽ hiển thị dựa trên mong muốn của mình vd: mình bấm vào trang login, Outlet render Login
};

export default PrivateRoute;
