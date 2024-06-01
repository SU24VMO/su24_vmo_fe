import React from "react";
import CarouselFeedBack from "./CarouselFeedBack/CarouselFeedBack";

const CustomerFeedBackSection = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <hr className="w-[100px] mobile:w-64 h-[1px] mobile:h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
        <p className="text-[10px] mobile:text-lg font-bold px-4 text-center">
          Chia sẻ từ người dùng VMO
        </p>
        <hr className="w-[100px] mobile:w-64 h-[1px] mobile:h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
      </div>
      <div className="flex flex-col items-center flex-wrap justify-center p-10">
        <CarouselFeedBack />
      </div>
    </div>
  );
};

export default CustomerFeedBackSection;
