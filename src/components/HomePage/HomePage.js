import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import RaiseFundSection from "./RaiseFundSection/RaiseFundSection";
import FundraisingCampaignSection from "./FundraisingCampaignSection/FundraisingCampaignSection";
import CallForActionSection from "./CallForActionSection/CallForActionSection";
import CustomerFeedBackSection from "./CustomerFeedBackSection/CustomerFeedBackSection";
import { Helmet } from "react-helmet";

const HomePage = () => {
  // Sử dụng useEffect để cuộn trang lên đầu sau khi component được render
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn nhẹ
    });
  }, []); // Mảng rỗng đảm bảo rằng hiệu ứng chỉ chạy một lần sau khi component mount
  return (
    <>
      <Helmet>
        <title>Trang chủ • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
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
