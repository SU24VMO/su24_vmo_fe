import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { axiosPublic } from "../../../../api/axiosInstance";
import { GET_TOP_DONATOR } from "../../../../api/apiConstants";
import CustomTopDonatorSkeleton from "./CustomTopDonatorSkeleton";

const CustomTopDonator = () => {
  const [donator, setDonator] = React.useState(null);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  // Hàm lấy dữ liệu người ủng hộ từ API
  const fetchData = async (signal) => {
    setDataLoaded(false);

    try {
      const response = await axiosPublic.get(GET_TOP_DONATOR, { signal });
      if (response.status === 200) {
        setDonator(response.data?.data);
        setDataLoaded(true);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchData(signal);
    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, []);

  // Hàm format số tiền ủng hộ
  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  const getAvatarStyle = (index) => {
    switch (index) {
      case 0:
        return "w-12 h-12 border-2 border-yellow-300";
      case 1:
        return "w-12 h-12 border-2 border-gray-500";
      case 2:
        return "w-12 h-12 border-2 border-yellow-600";
      default:
        return "w-12 h-12";
    }
  };

  const getBadgeStyle = (index) => {
    switch (index) {
      case 0:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-200 text-yellow-500 font-bold px-2 py-1 rounded-full text-xs";
      case 1:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-primary-foreground font-bold px-2 py-1 rounded-full text-xs";
      case 2:
        return "absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-primary-foreground font-bold px-2 py-1 rounded-full text-xs";
      default:
        return "";
    }
  };
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl text-center">
          Top 5 người ủng hộ nhiều nhất <br /> toàn hệ thống
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 justify-center">
          {dataLoaded ? (
            donator.map((donator, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className={getAvatarStyle(index)}>
                    <AvatarImage
                      src={donator.avatar}
                      alt={`@${donator.name}`}
                    />
                    <AvatarFallback>
                      {donator.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <div className={getBadgeStyle(index)}>{index + 1}</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    {donator.firstName + " " + donator.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Đã ủng hộ {formatMoney(donator.totalDonation)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <CustomTopDonatorSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomTopDonator;
