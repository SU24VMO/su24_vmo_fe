import React from "react";
import { Button } from "../../ui/button";
import { CarouselAutoScroll } from "./Carousel/CarouselAutoScroll";
import { Link } from "react-router-dom";
import logo_fpt from "../../../assets/images/home-page/hero-section/logo-fpt_black.png";

const star = (
  <svg
    className="h-4 w-4"
    width={51}
    height={51}
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
      fill="#14452F"
    />
  </svg>
);

const HeroSection = () => {
  return (
    <>
      {/* Hero */}
      <div className="mt-24 flex-col items-center justify-center">
        {/* Grid */}
        <div className="grid tablet:grid-cols-2 gap-4 tablet:gap-8 xl:gap-20 tablet:items-center">
          <div>
            <h1 className="scroll-m-20 text-2xl mobile:text-4xl font-extrabold tracking-tight lg:text-5xl text-green-theme-primary">
              VMO - Volunteer model for people in difficult circumstances
            </h1>
            <p className="mt-3 text-lg mobile:text-xl text-muted-foreground">
              Giải pháp công nghệ đồng hành cùng cộng đồng thiện nguyện minh
              bạch
            </p>
            {/* Buttons */}
            <div className="mt-7 gap-3 flex flex-col tablet:flex-row">
              <Link to="/viewCampaigns" className="w-full tablet:w-fit">
                <Button
                  size={"lg"}
                  className="w-full tablet:w-fit"
                  variant="green_theme_primary"
                >
                  Xem các chiến dịch
                </Button>
              </Link>
              <Link to={"/news"} className="w-full tablet:w-fit">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="w-full tablet:w-fit"
                >
                  Xem các bài đăng tin tức
                </Button>
              </Link>
            </div>
            {/* End Buttons */}
            <div className="mt-6 lg:mt-10 grid grid-rows-1 tablet:grid-cols-1 gap-x-5">
              {/* Review */}
              <div className="py-5">
                <div className="flex space-x-1">
                  {star}
                  {star}
                  {star}
                  {star}
                  {star}
                </div>
                <p className="mt-3 text-sm">
                  <span className="font-bold">4.6</span> /5 - từ 12k đánh giá
                </p>
                <div className="mt-5">
                  <img
                    src={logo_fpt}
                    width={80}
                    height={27}
                    alt="logo_fpt"
                    className="h-auto w-40"
                  />
                </div>
              </div>
              {/* End Review */}
            </div>
          </div>
          {/* Col */}
          <div className="flex items-center justify-center">
            <CarouselAutoScroll />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </>
  );
};

export default HeroSection;
