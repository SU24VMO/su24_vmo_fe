import React from "react";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import CarouselCampaigns from "./CarouselCampaigns/CarouselCampaigns";

const BottomDetailCampaignSection = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <p>
          <b>Các chiến dịch khác</b>
        </p>
        <Link to="/viewCampaigns">
          <Button variant="link" className="text-base">
            Xem thêm
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center flex-wrap justify-center p-10">
        <CarouselCampaigns />
      </div>
    </>
  );
};

export default BottomDetailCampaignSection;
