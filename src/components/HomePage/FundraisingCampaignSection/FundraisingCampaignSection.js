import React from "react";
import { CarouselAutoScrollDonator } from "./CarouselDonator/CarouselAutoScrollDonator";
import { Button } from "../../ui/button";
import CarouselCampaign from "./CarouselCampaign/CarouselCampaign";

const FundraisingCampaignSection = () => {
  return (
    <div className="flex-col items-center justify-center">
      {/* Separator */}
      <div className="flex items-center justify-center">
        <hr className="w-[100px] mobile:w-64 h-[1px] mobile:h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
        <p className="text-[10px] mobile:text-lg font-bold px-4">Chiến dịch gây quỹ nổi bật</p>
        <hr className="w-[100px] mobile:w-64 h-[1px] mobile:h-[2px] my-8 bg-black border-0 rounded dark:bg-gray-700" />
      </div>
      {/* Vertical carousel */}
      <div className="flex flex-col items-center flex-wrap justify-center my-10">
        <CarouselAutoScrollDonator />
      </div>
      {/* Tạo bởi Tổ chức */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm mobile:text-base">
          Tạo bởi <b>Tổ Chức</b>
        </p>
        <Button variant="link" className="text-sm mobile:text-base">
          Xem thêm
        </Button>
      </div>
      {/* Card tạo bởi tổ chức */}
      <div className="flex flex-col items-center flex-wrap justify-center p-10">
        <CarouselCampaign />
      </div>


      {/* Tạo bởi cá nhân */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm mobile:text-base">
          Tạo bởi <b>Cá nhân</b>
        </p>
        <Button variant="link" className="text-sm mobile:text-base">
          Xem thêm
        </Button>
      </div>
      {/* Card tạo bởi cá nhân */}
      <div className="flex flex-col items-center flex-wrap justify-center p-10">
        <CarouselCampaign />
      </div>
    </div>
  );
};

export default FundraisingCampaignSection;
