import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";
import { useNavigate } from "react-router-dom";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const navigate = useNavigate();

  const [locationIP, setLocationIP] = useState({
    latitude: '',
    longitude: '',
    road: '',
    suburb: '',
    city: '',
    country: '',
    postcode: '',
    country_code: '',
  });

  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (response.status === 200) {
            const data = response?.data;

            setLocationIP({
              latitude: data.lat,
              longitude: data.lon,
              road: data.address?.road || '',
              suburb: data.address?.suburb || '',
              city: data.address?.city || '',
              country: data.address?.country || '',
              postcode: data.address?.postcode || '',
              country_code: data.address?.country_code || '',
            });
            resolve();
          }
        } catch (error) {
          reject(error)

        }
      }, (error) => {

        if (error.code === error.PERMISSION_DENIED) {
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
          // localStorage.removeItem("isLogin");
          // localStorage.removeItem("user");
          // navigate("/login");
          toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: 'Vui lòng cho phép truy cập vị trí của bạn!',
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });

        }

      });
    });
  };



  useEffect(() => {
    fetchLocation();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <LocationContext.Provider value={{ locationIP, fetchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
