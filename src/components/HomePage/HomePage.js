import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import RaiseFundSection from "./RaiseFundSection/RaiseFundSection";
import FundraisingCampaignSection from "./FundraisingCampaignSection/FundraisingCampaignSection";
import CallForActionSection from "./CallForActionSection/CallForActionSection";
import CustomerFeedBackSection from "./CustomerFeedBackSection/CustomerFeedBackSection";

const HomePage = () => {
  return (
    <>
      <div className="w-full max-w-screen-desktop mobile:px-24 bg-gray-100 px-3">
        <HeroSection />
      </div>
      <div className="px-3 mobile:px-24">
        <FundraisingCampaignSection />
      </div>
      <div className="w-full max-w-screen-desktop">
        <CallForActionSection />
      </div>
      <div className="px-3 mobile:px-24">
        <RaiseFundSection />
      </div>
      <div className="px-3 mobile:px-24">
        <CustomerFeedBackSection />
      </div>
    </>
  );
};

export default HomePage;
