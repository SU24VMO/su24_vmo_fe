import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import CampaignsSection from "./CampaignsSection/CampaignsSection";
import { Helmet } from "react-helmet";

const ViewCampaignsPage = () => {
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
