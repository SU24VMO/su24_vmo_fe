import { Button } from "../../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../../ui/sheet";
import {
  Building2,
  HeartHandshake,
  Home,
  LandPlot,
  LayoutDashboard,
  LineChart,
  Menu,
  Newspaper,
  Package,
  Package2,
  ShoppingCart,
  SquareGanttChart,
  User,
  Users,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();


  // Hàm kiểm tra và trả về class tương ứng
  const getLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
    const activeClass = "bg-muted text-primary hover:text-primary";
    const inactiveClass = "text-muted-foreground hover:text-primary";
    return `${baseClass} ${location.pathname === path ? activeClass : inactiveClass
      }`;
  };

  return (
    <>
      {/* MOBILE NAV */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 tablet:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/moderator"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <div className="bg-vmo flex items-center py-2 px-5 rounded-full ">
                <div className="w-fit">
                  <SquareGanttChart className="w-fit" />

                </div>
                <span className="mx-[-0.65rem] flex items-center gap-4 rounded-xl text-xl px-4 py-2 ">VMO Nhân viên kiểm duyệt </span>
              </div>
            </Link>
            <Link
              to="/moderator"
              className={getLinkClass("/moderator")}
            >
              <div className="w-fit">
                <LayoutDashboard className="w-fit" />
              </div>
              Thống kê số liệu hệ thống
            </Link>
            <Link
              to="/moderator/manageRequestCampaigns"
              className={getLinkClass("/moderator/manageRequestCampaigns")}
            >
              <div className="w-fit">
                <HeartHandshake className="w-fit" />
              </div>
              Danh sách yêu cầu tạo chiến dịch

            </Link>
            <Link
              to="/moderator/manageRequestVolunteers"
              className={getLinkClass("/moderator/manageRequestVolunteers")}
            >
              <div className="w-fit">
                <User className="w-fit" />

              </div>
              Danh sách yêu cầu tài khoản tình nguyện viên

            </Link>
            <Link
              to="/moderator/manageRequestOrganizationManagers"
              className={getLinkClass("/moderator/manageRequestOrganizationManagers")}
            >
              <div className="w-fit">
                <User className="w-fit" />

              </div>
              Danh sách yêu cầu tài khoản quản lý tổ chức
            </Link>
            <Link
              to="/moderator/manageRequestOrganizations"
              className={getLinkClass("/moderator/manageRequestOrganizations")}
            >
              <div className="w-fit">
                <Building2 className="w-fit" />

              </div>
              Danh sách yêu cầu tạo tổ chức
            </Link>
            <Link
              to="/moderator/manageRequestActivities"
              className={getLinkClass("/moderator/manageRequestActivities")}
            >
              <div className="w-fit">
                <LandPlot className="w-fit" />

              </div>
              Danh sách yêu cầu tạo hoạt động
            </Link>

            <Link
              to="/moderator/manageRequestNews"
              className={getLinkClass("/moderator/manageRequestNews")}
            >
              <div className="w-fit">
                <Newspaper className="w-fit" />
              </div>
              Danh sách yêu cầu tạo bài đăng
            </Link>
          </nav>

        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
