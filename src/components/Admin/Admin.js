import React from "react";
import NavigationBar from "./NavigationBar/NavigationBar";
import HomePage from "./HomePage/HomePage";

const Admin = () => {
  return (
    // CONTAINER
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      {/* NAV*/}
      <NavigationBar />
      {/* BODY */}
      <main className="flex flex-1 flex-col gap-4 p-4 mobile:gap-8 mobile:p-8">
        <HomePage />
      </main>
    </div>
  );
};

export default Admin;
