import { Separator } from "../../../ui/separator";
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
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  // Hàm kiểm tra và trả về class tương ứng
  const getLinkClass = (path) => {
    const baseClass =
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2";
    const activeClass = "bg-muted text-foreground hover:text-foreground";
    const inactiveClass = "text-muted-foreground hover:text-foreground";
    return `${baseClass} ${
      location.pathname === path ? activeClass : inactiveClass
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
              <Package2 className="h-6 w-6" />
              <p>VMO Admin</p>
            </Link>
            <Separator />
            <Link to="/admin" className={getLinkClass("/admin")}>
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/admin/manageMembers"
              className={getLinkClass("/admin/manageMembers")}
            >
              <ShoppingCart className="h-5 w-5" />
              Manage members
              {/* Chỉ bỏ comment khi muốn sử dụng làm số lượng thông báo */}
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge> */}
            </Link>
            <Link
              to="/admin/manageOrganizationManagers"
              className={getLinkClass("/admin/manageOrganizationManagers")}
            >
              <Package className="h-5 w-5" />
              Manage organization managers
            </Link>
            <Link
              to="/admin/manageRequestManagers"
              className={getLinkClass("/admin/manageRequestManagers")}
            >
              <Users className="h-5 w-5" />
              Manage request managers
            </Link>
            <Link
              to="/admin/manageUsers"
              className={getLinkClass("/admin/manageUsers")}
            >
              <LineChart className="h-5 w-5" />
              Manage users
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
