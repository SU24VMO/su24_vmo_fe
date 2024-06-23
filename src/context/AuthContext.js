import React, { createContext, useState } from "react";
import { axiosPublic } from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN, REGISTER } from "../api/apiConstants";
import { jwtDecode } from "jwt-decode"; // Note the import style
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true" || false
  );
  const [loading, setLoading] = useState(false); // State for loading

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const registerAction = async (email, password, username, phoneNumber, firstName, lastName, gender, avatar, facebookUrl, youtubeUrl, tiktokUrl, birthday, accountType) => {
    setLoading(true); // Start loading
    try {
      const response = await axiosPublic.post(REGISTER, {
        email, password, username, phoneNumber, firstName, lastName, gender, avatar, facebookUrl, youtubeUrl, tiktokUrl, birthday, accountType
      });

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        const userDecode = jwtDecode(accessToken);
        setIsLogin(true);
        setUser(userDecode);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        // Save information to localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", JSON.stringify(userDecode));
        // Toast notification
        toast({
          title: "Đăng ký thành công",
          description: "Chào mừng " + lastName + " !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        // Navigate to the specified page
        navigate(from, { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Đăng ký thất bại !",
          description: "Vui lòng kiểm tra lại thông tin đăng ký !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Đăng ký thất bại !",
        description: error.response.data.message,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      setLoading(false); // Stop loading when action is complete or fails
    }
  }

  const loginAction = async (account, password) => {
    setLoading(true); // Start loading
    try {
      const response = await axiosPublic.post(LOGIN, {
        account: account,
        password: password,
      });

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;

        const userDecode = jwtDecode(accessToken);

        setIsLogin(true);
        setUser(userDecode);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        // Save information to localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", JSON.stringify(userDecode));

        // Navigate to the specified page
        if (userDecode.role === "Admin") {
          navigate("/admin");
        } else {
          navigate(from, { replace: true });
        }
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng trở lại " + account + " !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.log("Login successful");
      } else {
        toast({
          variant: "destructive",
          title: "Đăng nhập thất bại !",
          description: "Vui lòng kiểm tra lại thông tin đăng nhập !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại !",
        description: "Vui lòng kiểm tra lại thông tin đăng nhập !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      setLoading(false); // Stop loading when action is complete or fails
    }
  };

  const updateUserAvatar = (newAvatarUrl) => {
    setUser((currentUser) => {
      const updatedUser = {
        ...currentUser,
        avatar: newAvatarUrl,
      };
      // Cập nhật localStorage với thông tin người dùng đã cập nhật
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateUserInformation = (firstname, lastname, birthday, gender, phonenumber, facebooklink, tiktoklink, youtubelink) => {
    setUser((currentUser) => {
      const updatedUser = {
        ...currentUser,
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        gender: gender, 
        phonenumber: phonenumber, 
        facebooklink: facebooklink,
        tiktoklink: tiktoklink,
        youtubelink: youtubelink,
      };
      // Cập nhật localStorage với thông tin người dùng đã cập nhật
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const logOut = () => {
    setAccessToken("");
    setRefreshToken("");
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    toast({
      title: "Đăng xuất thành công!",
      action: <ToastAction altText="undo">Ẩn</ToastAction>,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLogin,
        user,
        refreshToken,
        registerAction,
        loginAction,
        logOut,
        loading,
        updateUserAvatar,
        updateUserInformation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
