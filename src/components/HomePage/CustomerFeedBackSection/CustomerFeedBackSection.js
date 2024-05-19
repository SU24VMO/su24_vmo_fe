import React from "react";
import CarouselFeedBack from "./CarouselFeedBack/CarouselFeedBack";

const CustomerFeedBackSection = () => {
  return (
    <div>
      <div className="flex items-center justify-center mb-10">
        <hr className="w-64 h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
        <p className="text-lg font-bold px-4">Chia sẻ từ người dùng VMO</p>
        <hr className="w-64 h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
      </div>
      <div className="flex flex-col items-center flex-wrap justify-center p-10">
        <CarouselFeedBack />
      </div>
    </div>
  );
};

export default CustomerFeedBackSection;
