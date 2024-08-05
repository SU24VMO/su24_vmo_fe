import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

const BASE_URL = "https://vmo.azurewebsites.net";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// let token = localStorage.getItem("accessToken") || null;
let refreshTokenPromise = null;
let locationCache = null;
let locationFetchPromise = null;
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

// Hàm lấy dữ liệu location 
const fetchLocation = async () => {
  if (locationCache) {
    return locationCache;
  }
  if (locationFetchPromise) {
    console.log(locationFetchPromise);

    return locationFetchPromise;
  }

  locationFetchPromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        if (response.status === 200) {
          const data = response?.data;
          console.log("Location fetched: ", data);
          locationCache = {
            latitude: data.lat,
            longitude: data.lon,
            road: data.address?.road || '',
            suburb: data.address?.suburb || '',
            city: data.address?.city || '',
            country: data.address?.country || '',
            postcode: data.address?.postcode || '',
            country_code: data.address?.country_code || '',
          };
          resolve(locationCache);
          locationFetchPromise = null;  // Reset the promise
        } else {
          toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: 'Không thể tìm nạp dữ liệu vị trí!',
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          reject(new Error('Không thể tìm nạp dữ liệu vị trí!'));
        }
      } catch (error) {
        reject(error)

      }
    }, (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        toast({
          variant: "destructive",
          title: "Đã xảy ra lỗi!",
          description: 'Vui lòng cho phép truy cập vị trí của bạn!',
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });

      }

    });
  });

  return locationFetchPromise;
};

// Trả về location 
axiosPrivate.interceptors.request.use(async (req) => {
  let token = localStorage.getItem("accessToken") || null;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  // Check if the token is expired
  if (decodedToken.exp < currentTime) {

    locationCache = await fetchLocation();

    if (!refreshTokenPromise) {
      refreshTokenPromise = axios.post(
        `${BASE_URL}/api/authentication/refresh-token`,
        {
          refreshToken: localStorage.getItem("refreshToken"),
          ...locationCache,
        }
      );
    }

    try {
      const response = await refreshTokenPromise;
      refreshTokenPromise = null;
      locationCache = null
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

      locationCache = await fetchLocation();

      try {
        if (!refreshTokenPromise) {
          refreshTokenPromise = axios.post(
            `${BASE_URL}/api/authentication/refresh-token`,
            {
              refreshToken: localStorage.getItem("refreshToken"),
              ...locationCache,

            }
          );
        }

        const response = await refreshTokenPromise;
        refreshTokenPromise = null;
        locationCache = null
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
