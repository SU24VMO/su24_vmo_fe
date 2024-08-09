import {
  Building2,
  Home,
  LayoutDashboard,
  LineChart,
  Package,
  Package2,
  Receipt,
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
    const inactiveClass = "text-muted-foreground hover:text-primary";
    return `${baseClass} ${location.pathname === path ? activeClass : inactiveClass
      }`;
  };

  return (
    <>
      {/* Nav Desktop */}
      <div className="hidden tablet:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 tablet:h-[60px] tablet:px-6  bg-vmo">
            <Link to="/admin" className="flex items-center gap-2 font-semibold">
            <div className="w-fit">
            <SquareGanttChart className="w-fit" />

               </div>
              <span className="text-xl font-bold">VMO Quản trị hệ thống</span>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium tablet:px-4">
              <Link to="/admin" className={getLinkClass("/admin")}>
                <div className="w-fit">
                  <LayoutDashboard className="w-fit" />
                </div>
                Thống kê số liệu hệ thống
              </Link>
              <Link
                to="/admin/manageMembers"
                className={getLinkClass("/admin/manageMembers")}
              >
                <div className="w-fit">
                  <Users className="w-fit" />

                </div>
                Quản lý tài khoản thành viên
              </Link>
              <Link
                to="/admin/manageVolunteers"
                className={getLinkClass("/admin/manageVolunteers")}
              >
                <div className="w-fit">
                  <Users className="w-fit" />

                </div>
                Quản lý tài khoản tình nguyện viên
              </Link>
              <Link
                to="/admin/manageOrganizationManagers"
                className={getLinkClass("/admin/manageOrganizationManagers")}
              >
                <div className="w-fit">
                  <Building2 className="w-fit" />

                </div>
                Quản lý tài khoản quản lý tổ chức
              </Link>
              <Link
                to="/admin/manageModerators"
                className={getLinkClass("/admin/manageModerators")}
              >
                <div className="w-fit">
                  <Users className="w-fit" />

                </div>
                Quản lý tài khoản nhân viên kiểm duyệt
              </Link>
              <Link
                to="/admin/manageBankingTier1"
                className={getLinkClass("/admin/manageBankingTier1")}
              > 
               <div className="w-fit">
               <Receipt className="w-fit" />
               </div>
                Quản lý danh sách sao kê giao dịch toàn phần
              </Link>

              <Link
                to="/admin/manageBankingTier2"
                className={getLinkClass("/admin/manageBankingTier2")}
              > 
               <div className="w-fit">
               <Receipt className="w-fit" />
               </div>
                Quản lý danh sách sao kê giao dịch từng phần
              </Link>

              <Link
                to="/admin/manageTransaction"
                className={getLinkClass("/admin/manageTransaction")}
              > 
               <div className="w-fit">
               <Receipt className="w-fit" />
               </div>
                Quản lý danh sách giao dịch
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
