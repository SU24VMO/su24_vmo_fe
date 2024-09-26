import React, { createContext, useContext, useState } from "react";
import { axiosPrivate, axiosPublic } from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { GET_ACCOUNT_BY_ID, LOGIN, REGISTER } from "../api/apiConstants";
import { jwtDecode } from "jwt-decode"; // Note the import style
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";
import { LocationContext } from "./LocationContext";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [abortController, setAbortController] = useState(null);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [unreadCount, setUnreadCount] = React.useState(0);
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
  const [headerLoading, setHeaderLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { locationIP, fetchLocation } = useContext(LocationContext);
  const registerAction = async (
    email,
    password,
    username,
    avatar,
    phoneNumber,
    firstName,
    lastName,
    gender,
    birthday,
    facebookUrl,
    youtubeUrl,
    tiktokUrl,
    accountType
  ) => {
    setLoading(true); // Start loading
    try {
      const response = await axiosPublic.post(REGISTER, {
        email,
        password,
        username,
        avatar,
        phoneNumber,
        firstName,
        lastName,
        gender,
        birthday,
        facebookUrl,
        youtubeUrl,
        tiktokUrl,
        accountType,
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
  };

  const handleRefreshHeader = async (controller) => {
    setHeaderLoading(true);
    if (!isLogin) return;
    try {
      const accountInformation = await axiosPrivate.get(
        GET_ACCOUNT_BY_ID + `${user.account_id}?accountId=${user.account_id}`,
        { signal: controller.signal } // Truyền signal vào yêu cầu
      );
      if (accountInformation.status === 200) {
        // Tính toán số lượng isSeen: false
        const unread = accountInformation.data.data.notifications.reduce(
          (acc, noti) => acc + (noti.isSeen ? 0 : 1),
          0
        );
        setUnreadCount(unread); // Cập nhật state với tổng số lượng tính được
        setUser((currentUser) => {
          const updatedUser = {
            ...currentUser,
            is_verified:
              accountInformation.data.data.isVerified === true
                ? "True"
                : "False",
            role:
              accountInformation.data.data.role === 0
                ? "Admin"
                : accountInformation.data.data.role === 1
                ? "Member"
                : accountInformation.data.data.role === 2
                ? "Volunteer"
                : accountInformation.data.data.role === 3
                ? "OrganizationManager"
                : "Moderator",
          };
          // Cập nhật localStorage với thông tin người dùng đã cập nhật
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.log("Error fetching data from API:", error);
      }
    } finally {
      setHeaderLoading(false);
    }
  };

  const loginAction = async (account, password) => {
    await fetchLocation();

    toast({
      title: "Đang đăng nhập...",
      description: "Vui lòng chờ đợi trong giây lát !",
      action: <ToastAction altText="undo">Ẩn</ToastAction>,
    });
    setLoading(true); // Start loading
    try {
      const response = await axiosPublic.post(LOGIN, {
        account: account,
        password: password,
        latitude: locationIP.latitude,
        longitude: locationIP.longitude,
        road: locationIP.road,
        suburb: locationIP.suburb,
        city: locationIP.city,
        country: locationIP.country,
        postcode: locationIP.postcode,
        country_code: locationIP.country_code,
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
        } else if (userDecode.role === "Moderator") {
          navigate("/moderator");
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
        description: error.response
          ? error.response.data.message
          : "Vui lòng kiểm tra lại thông tin đăng nhập !",
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

  const updateUserInformation = (
    firstname,
    lastname,
    birthday,
    gender,
    phonenumber,
    facebooklink,
    tiktoklink,
    youtubelink
  ) => {
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
    if (abortController) {
      abortController.abort(); // Hủy bỏ yêu cầu API khi đăng xuất
    }
    setAccessToken("");
    setRefreshToken("");
    setIsLogin(false);
    setUser(null);
    setUnreadCount(0);
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
        headerLoading,
        updateUserAvatar,
        updateUserInformation,
        handleRefreshHeader,
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
