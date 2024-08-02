import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { LocationContext } from "../LocationProvider/LocationProvider";

const BASE_URL = "https://vmo.azurewebsites.net";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// let token = localStorage.getItem("accessToken") || null;
let refreshTokenPromise = null;

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

const useLocation = () => {
  const { locationIP, fetchLocation } = useContext(LocationContext);
  return { locationIP, fetchLocation };
};

export default useLocation;

axiosPrivate.interceptors.request.use(async (req) => {
  let token = localStorage.getItem("accessToken") || null;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  // Check if the token is expired
  if (decodedToken.exp < currentTime) {
    const { locationIP, fetchLocation } = useLocation();
    await fetchLocation()
    if (!refreshTokenPromise) {
      refreshTokenPromise = axios.post(
        `${BASE_URL}/api/authentication/refresh-token`,
        {
          refreshToken: localStorage.getItem("refreshToken"),
          latitude: locationIP.latitude,
          longitude: locationIP.longitude,
          road: locationIP.road,
          suburb: locationIP.suburb,
          city: locationIP.city,
          country: locationIP.country,
          postcode: locationIP.postcode,
          country_code: locationIP.country_code,
        }
      );
    }

    try {
      const response = await refreshTokenPromise;
      refreshTokenPromise = null;

      const newAccessToken = response.data.data.accessToken;
      const newRefreshToken = response.data.data.refreshToken;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("user", JSON.stringify(jwtDecode(newAccessToken)));

      req.headers.Authorization = `Bearer ${newAccessToken}`;
    } catch (error) {
      refreshTokenPromise = null;
      console.error("Failed to refresh token:", error);
      // Handle refresh token failure (e.g., logout the user)
      throw error;
    }
  }

  return req;
});

axiosPrivate.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;


    if (error.response && error.response.status === 401) {
      const { locationIP, fetchLocation } = useLocation();
      await fetchLocation()

      try {
        if (!refreshTokenPromise) {
          refreshTokenPromise = axios.post(
            `${BASE_URL}/api/authentication/refresh-token`,
            {
              refreshToken: localStorage.getItem("refreshToken"),
              latitude: locationIP.latitude,
              longitude: locationIP.longitude,
              road: locationIP.road,
              suburb: locationIP.suburb,
              city: locationIP.city,
              country: locationIP.country,
              postcode: locationIP.postcode,
              country_code: locationIP.country_code,

            }
          );
        }

        const response = await refreshTokenPromise;
        refreshTokenPromise = null;

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("user", JSON.stringify(jwtDecode(newAccessToken)));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        refreshTokenPromise = null;
        console.error("Failed to refresh token:", refreshError);
        // Handle refresh token error (e.g., logout the user or redirect to login)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };
