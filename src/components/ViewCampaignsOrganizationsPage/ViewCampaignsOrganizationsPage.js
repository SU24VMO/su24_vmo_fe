import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import CampaignsSection from "./CampaignsSection/CampaignsSection";
import { Helmet } from "react-helmet";

const ViewCampaignsOrganizationsPage = () => {
  return (
    <>
      <Helmet>
        <title>Các chiến dịch của tổ chức • VMO</title>
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

export default ViewCampaignsOrganizationsPage;
