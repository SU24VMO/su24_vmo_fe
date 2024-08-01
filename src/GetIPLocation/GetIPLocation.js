import React, { useEffect, useState } from 'react';

const GetIPLocation = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setIPAddress(data.ip);
        setCountry(data.country_name);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>Your IP Address is: {ipAddress}</p>
          <p>Your country is: {country}</p>
          <p>Your latitude is: {latitude}</p>
          <p>Your longitude is: {longitude}</p>
        </>
      )}
    </div>
  );
};

export default GetIPLocation;
