import React from "react";
import DesktopNav from "./NavigationBar/Desktop/DesktopNav";
import MobileNav from "./NavigationBar/Mobile/MobileNav";
import SearchBarNav from "./NavigationBar/Feature/SearchBarNav";
import UserAvatarNav from "./NavigationBar/Feature/UserAvatarNav";
import HomePage from "./HomePage/HomePage";
import ManageRequestCampaignsPage from "./ManageRequestCampaignsPage/ManageRequestCampaignsPage";
import ManageRequestNewsPage from "./ManageRequestNewsPage/ManageRequestNewsPage";

const RequestManager = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 tablet:grid-cols-4">
      <div className="col-span-1 border-r bg-muted/40">
        <DesktopNav />
      </div>
      <div className="flex flex-col tablet:col-span-3">
        {/* Nav Mobile */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 tablet:h-[60px] tablet:px-6">
          <MobileNav />
          {/* Search Bar */}
          <SearchBarNav />
          {/* UserAvatar */}
          <UserAvatarNav />
        </header>
        {/* Body */}
        <main className="flex flex-1 flex-col gap-4 p-4 mobile:gap-8 mobile:p-8">
          {/* <HomePage></HomePage> */}
          {/* <ManageRequestCampaignsPage></ManageRequestCampaignsPage> */}
          <ManageRequestNewsPage/>
        </main>
      </div>
    </div>
  );
};

export default RequestManager;
