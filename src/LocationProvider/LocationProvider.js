import React, { createContext, useState, useEffect } from "react";
import { axiosPublic } from "../api/axiosInstance";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
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
          const response = await axiosPublic.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (response.status === 200) {
            const data = response?.data;
            console.log('====================================');
            console.log(data);
            console.log('====================================');
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
          } else {
            reject(new Error('Không thể tìm nạp dữ liệu vị trí'));
          }
        } catch (error) {
          console.error("Lỗi khi tìm nạp dữ liệu vị trí: ", error);
          reject(error);
        }
      }, (error) => {
        console.error("Lỗi nhận vị trí địa lý: ", error);
        reject(error);
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
