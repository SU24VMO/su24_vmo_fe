import React from "react";
import HomePage from "./HomePage/HomePage";
import DesktopNav from "./NavigationBar/Desktop/DesktopNav";
import MobileNav from "./NavigationBar/Mobile/MobileNav";
import SearchBarNav from "./NavigationBar/Feature/SearchBarNav";
import UserAvatarNav from "./NavigationBar/Feature/UserAvatarNav";
import ManageUsersPage from "./ManageUsersPage/ManageUsersPage";
import ManageOrganizationManagers from "./ManageOrganizationManagersPage/ManageOrganizationManagersPage";

const Admin = () => {
  return (
    <div className="grid min-h-screen w-full mobile:grid-cols-[220px_1fr] tablet:grid-cols-[280px_1fr]">
      <DesktopNav />
      <div className="flex flex-col">
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
          {/* <HomePage /> */}
          {/* <ManageUsersPage /> */}
          <ManageOrganizationManagers/>
        </main>
      </div>
    </div>
  );
};

export default Admin;
