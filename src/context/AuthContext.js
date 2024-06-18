import React, { createContext, useState } from "react";
import { axiosPublic } from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN } from "../api/apiConstants";
import {jwtDecode} from "jwt-decode"; // Note the import style
import Loading from "../components/Loading/Loading"; // Import your Loading component

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === 'true' || false);
    const [loading, setLoading] = useState(false); // State for loading

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

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

                navigate(from, { replace: true }); // Navigate to the specified page
                console.log("Login successful");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            // Stop loading after 20 seconds
            setTimeout(() => {
                setLoading(false);
            }, 20000); // 20 seconds
        }
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

        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ accessToken, isLogin, user, refreshToken, loginAction, logOut }}>
            {loading && <Loading />} {/* Conditionally render the Loading component */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
