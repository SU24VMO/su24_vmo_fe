import React from "react";
import { Button } from "../../ui/button";
import CarouselCampaign from "./CarouselCampaign/CarouselCampaign";

const BottomDetailCampaignSection = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <p>
          <b>Các chiến dịch khác</b>
        </p>
        <Button variant="link" className="text-base">
          Xem thêm
        </Button>
      </div>
      <div className="flex flex-col items-center flex-wrap justify-center p-10">
        <CarouselCampaign />
      </div>
    </>
  );
};

export default BottomDetailCampaignSection;
