import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const BASE_URL = "https://localhost:7173";

const BASE_URL = "https://vmo.azurewebsites.net";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

let token = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosPrivate.interceptors.request.use(async (req) => {
  if (!token) {
    // eslint-disable-next-line no-const-assign
    token = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    req.headers.Authorization = `Bearer ${token}`;
  }

  const time = jwtDecode(token);
  let date = new Date();

  // Check if the token is expired
  const isExpired = time.exp < date.getTime() / 1000;
  const params = {
    refreshToken: localStorage.getItem("refreshToken"),
  };

  if (!isExpired) {
    return req;
  }
  else {
    console.log(req);

    const response = await axios.post(
      `${BASE_URL}/api/authentication/refresh-token`,
      params
    );

    const user = jwtDecode(response.data.accessToken)

    // localStorage.setItem("loginInfo", JSON.stringify(response.data));
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    req.headers.Authorization = `Bearer ${response.data.accessToken}`;

    // Return the updated request
    return req;
  }
});

// Add a response interceptor to handle 401 errors
axiosPrivate.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error response status is 401, attempt to refresh the token
    if (error.response && error.response.status === 401) {
      try {
        const params = {
          refreshToken: localStorage.getItem("refreshToken"),
        };

        const response = await axios.post(`${BASE_URL}/api/authentication/refresh-token`, params);

        const newToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;
        const user = jwtDecode(newToken);

        localStorage.setItem("accessToken", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error, e.g., logout the user or redirect to login
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // If it's a different error, just throw it
    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };