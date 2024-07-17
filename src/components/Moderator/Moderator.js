import React from "react";
import DesktopNav from "./NavigationBar/Desktop/DesktopNav";
import MobileNav from "./NavigationBar/Mobile/MobileNav";
import UserAvatarNav from "./NavigationBar/Feature/UserAvatarNav";
import { Outlet } from "react-router-dom";

const Moderator = () => {
  return (
    <div className=" contents tablet:grid min-h-screen  w-full grid-cols-1 tablet:grid-cols-5 ">
      <div className="col-span-1 border-r bg-muted/40 ">
        <DesktopNav />
      </div>
      <div className="flex flex-col tablet:col-span-4">
        {/* Nav Mobile */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 tablet:h-[60px] tablet:px-6">
          <MobileNav />
          {/* Search Bar */}
          {/* <SearchBarNav /> */}
          <div className="w-full flex-1"></div>
          {/* UserAvatar */}
          <UserAvatarNav />
        </header>
        {/* Body */}
        <main className="flex flex-1 flex-col gap-4 p-4 mobile:gap-8 mobile:p-8">
        <Outlet />
         
       </main>
      </div>
    </div>
  );
};

export default Moderator;
