import { Separator } from "../../../ui/separator";
import { Button } from "../../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../../ui/sheet";
import {
  Building2,
  Home,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  Receipt,
  ShoppingCart,
  SquareGanttChart,
  Users,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  // Hàm kiểm tra và trả về class tương ứng
  const getLinkClass = (path) => {
    const baseClass =
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2";
    const activeClass = "bg-muted text-foreground hover:text-foreground";
    const inactiveClass = "text-muted-foreground hover:text-foreground";
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
              to="/admin"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <div className="bg-vmo flex items-center py-2 px-5 rounded-full ">
                <div className="w-fit">
                  <SquareGanttChart className="w-fit" />

                </div>
                <span className="mx-[-0.65rem] flex items-center gap-4 rounded-xl text-xl px-4 py-2 ">VMO Quản trị hệ thống</span>
              </div>
            </Link>
            <Separator />
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
              {/* Chỉ bỏ comment khi muốn sử dụng làm số lượng thông báo */}
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge> */}
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
          {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
