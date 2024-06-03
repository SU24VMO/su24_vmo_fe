import React, { useState } from "react";
import { ReactComponent as IconSlidebar } from "../../../assets/images/button-slidebar.svg";
import AllCampaignsButton from "./AllCampaignsButton";
import Phase1Button from "./Phase1Button";
import Phase2Button from "./Phase2Button";
import Phase3Button from "./Phase3Button";
import AllActivitiesButton from "./AllActivitiesButton";
import { Link } from "react-router-dom";

export default function ManageSlideBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {isDrawerOpen ? (
        ""
      ) : (
        <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 ">
          <div
            className="w-16 h-16 rounded-tr-full rounded-br-full p-3 border-x-2  drop-shadow-xl bg-white flex items-center justify-center cursor-pointer "
            onClick={toggleDrawer}
          >
            <IconSlidebar />
          </div>
        </div>
      )}

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 "
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-50 w-64 h-screen p-4 overflow-y-auto transition-transform rounded-tr-xl rounded-br-xl shadow ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full "
        } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          MEMBER'S MANAGEMENT SPACE
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/manage/allCampaigns">
                <AllCampaignsButton />
              </Link>
            </li>
            <li>
              <Link to="/manage/allPhase1">
                <Phase1Button />
              </Link>
            </li>
            <li>
              <Link to="/manage/allPhase2">
                <Phase2Button />
              </Link>
            </li>
            <li>
              <Link to="/manage/allPhase3">
                <Phase3Button />
              </Link>
            </li>
            <li>
              <Link to="/manage/allActivities">
                <AllActivitiesButton />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
