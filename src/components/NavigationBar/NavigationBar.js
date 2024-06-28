import React from "react";
import DesktopNavLeft from "./Desktop/DesktopNavLeft";
import MobileNavLeft from "./Mobile/MobileNavLeft";
import DesktopNavRight from "./Desktop/DesktopNavRight";
import MobileNavRight from "./Mobile/MobileNavRight";

const NavigationBar = () => {
  return (
    <header>
      {/* DESKTOP */}
      <div className="hidden tablet:flex h-14 items-center justify-between px-4 ">
        <DesktopNavLeft />
        <DesktopNavRight />
      </div>
      {/* MOBILE */}
      <div className="tablet:hidden flex h-14 items-center justify-between px-4">
        <MobileNavLeft />
        <MobileNavRight />
      </div>
    </header>
  );
};

export default NavigationBar;
