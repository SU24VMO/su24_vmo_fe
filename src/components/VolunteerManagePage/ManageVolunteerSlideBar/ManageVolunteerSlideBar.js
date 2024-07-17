import React, { useState } from "react";
import { ReactComponent as IconSlidebar } from "../../../assets/images/button-slidebar.svg";
import AllCampaignsButton from "./AllCampaignsButton";
import Phase1Button from "./Phase1Button";
import Phase2Button from "./Phase2Button";
import Phase3Button from "./Phase3Button";
import AllActivitiesButton from "./AllActivitiesButton";
import { Link, useLocation } from "react-router-dom";
import AllNewsButton from "./AllNewsButton";

export default function ManageVolunteerSlideBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const location = useLocation();

  // Hàm kiểm tra và trả về class tương ứng
  const getLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all shadow-inner  my-2";
    const activeClass = "bg-muted text-primary hover:text-primary";
    const inactiveClass = "hover:text-gray-300 hover:shadow-lg hover:border-transparent hover:bg-green-600";
    return `${baseClass} ${location.pathname === path ? activeClass : inactiveClass
      }`;
  };


  return (
    <div className="">
      {isDrawerOpen ? (
        ""
      ) : (
        <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 ">
          <div
            className="w-16 h-16 rounded-tr-full rounded-br-full p-3 border-x-2  drop-shadow-xl bg-vmo flex items-center justify-center cursor-pointer "
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
        className={`fixed z-[100] top-0 left-0  w-72 h-screen p-4 overflow-y-auto transition-transform rounded-tr-xl rounded-br-xl shadow ${isDrawerOpen ? "translate-x-0" : "-translate-x-full "
          } bg-green-500 dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="w-full">
          <div className="bg-green-700 p-2 w-fit rounded">
            <h5
              id="drawer-navigation-label"
              className="text-base font-semibold text-gray-200 uppercase "
            >
              Danh sách quản lí
            </h5>
          </div>
          <button
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-navigation"
            className=" bg-gray-200 text-gray-400  hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-5 end-5 inline-flex items-center "
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
        </div>
        <div className="py-4 overflow-y-auto ">
          <ul className="space-y-2 font-medium">

            <Link to="/manage/volunteer/allCampaigns">
              <li className={getLinkClass("/manage/volunteer/allCampaigns")}>
                <AllCampaignsButton />
              </li>
            </Link>
            <Link to="/manage/volunteer/allActivities">
              <li className={getLinkClass("/manage/volunteer/allActivities")}>
                <AllActivitiesButton />
              </li>
            </Link>
            <Link to="/manage/volunteer/allNews">
              <li className={getLinkClass("/manage/volunteer/allNews")}>
                <AllNewsButton />
              </li>
            </Link>
            <Link to="/manage/volunteer/allPhase1">
              <li className={getLinkClass("/manage/volunteer/allPhase1")}>
                <Phase1Button />
              </li>
            </Link>
            <Link to="/manage/volunteer/allPhase2">
              <li className={getLinkClass("/manage/volunteer/allPhase2")}>
                <Phase2Button />
              </li>
            </Link>
            <Link to="/manage/volunteer/allPhase3">
              <li className={getLinkClass("/manage/volunteer/allPhase3")}>
                <Phase3Button />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
