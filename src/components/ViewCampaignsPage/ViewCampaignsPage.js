import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import CampaignsSection from "./CampaignsSection/CampaignsSection";
import { Helmet } from "react-helmet";

const ViewCampaignsPage = () => {
  return (
    <>
      <Helmet>
        <title>Danh sách các chiến dịch • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="w-full max-w-screen-desktop px-6 mobile:px-24">
        <HeroSection />
        <CampaignsSection />
      </div>
    </>
  );
};

export default ViewCampaignsPage;
