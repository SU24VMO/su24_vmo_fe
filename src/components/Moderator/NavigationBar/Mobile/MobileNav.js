import { Button } from "../../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../../ui/sheet";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
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
              <Package2 className="h-6 w-6" />
              <span className="sr-only">VMO Nhân viên kiểm duyệt</span>
            </Link>
            <Link
              to="/moderator"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Thống kê số liệu
            </Link>
            <Link
              to="/moderator/manageRequestCampaigns"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Danh sách yêu cầu chiến dịch

              {/* Chỉ bỏ comment khi muốn sử dụng làm số lượng thông báo */}
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge> */}
            </Link>
            <Link
              to="/moderator/manageRequestVolunteers"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Danh sách yêu cầu thành viên

            </Link>
            <Link
              to="/moderator/manageRequestOrganizations"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Danh sách yêu cầu tổ chức
            </Link>
            <Link
              to="/moderator/manageRequestActivities"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Danh sách yêu cầu hoạt động
            </Link>

            <Link
               to="/moderator/manageRequestOrganizationManagers"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Danh sách yêu cầu quản lí tổ chức
            </Link>

            <Link
              to="/moderator/manageRequestNews"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Danh sách yêu cầu tin tức
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
