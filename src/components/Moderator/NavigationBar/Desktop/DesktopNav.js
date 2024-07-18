import {
  Building2,
  HeartHandshake,
  Home,
  LandPlot,
  LayoutDashboard,
  LineChart,
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

const DesktopNav = () => {

  const location = useLocation();

  // Hàm kiểm tra và trả về class tương ứng
  const getLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
    const activeClass = "bg-muted text-primary hover:text-primary";
    const inactiveClass = " hover:text-gray-600";
    return `${baseClass} ${location.pathname === path ? activeClass : inactiveClass
      }`;
  };


  return (
    <>
      {/* Nav Desktop */}
      <div className="hidden tablet:block ">
        <div className="flex h-full max-h-screen flex-col gap-2 ">
          <div className="flex h-14 items-center border-b px-4 tablet:h-[60px] tablet:px-6 bg-vmo">
            <Link to="/moderator" className="flex items-center gap-2 font-semibold">
            <div className="w-fit">
            <SquareGanttChart className="w-fit" />

               </div>
              <span className="font-bold">VMO Nhân viên kiểm duyệt</span>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 ">
            <nav className="grid gap-2 items-start px-2 text-sm font-medium tablet:px-4 ">
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
                {/* Chỉ bỏ comment khi muốn dùng để hiện số lượng thông báo */}
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
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

                Danh sách yêu cầu tài khoản tổ chức
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
          </div>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 mobile:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 mobile:p-4 mobile:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
