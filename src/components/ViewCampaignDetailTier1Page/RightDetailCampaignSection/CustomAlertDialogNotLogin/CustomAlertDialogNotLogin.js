import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/alert-dialog";

const CustomAlertDialogNotLogin = ({ isDialogOpen, setIsDialogOpen }) => {
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleContinueLogin = () => {
    // Navigate to login page or handle the login flow
    navigate("/login"); // Adjust the login path as necessary
    setIsDialogOpen(false);
  };

  return (
    <AlertDialog defaultOpen={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Vui lòng đăng nhập để có thể ủng hộ chiến dịch
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn hãy vui lòng đăng nhập để có thể ủng hộ chiến dịch, điều này sẽ
            giúp cho ứng dụng thiện nguyện minh bạch hơn !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog} className={"m-0"}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueLogin} className={"m-0"}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialogNotLogin;
