import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
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
    return `${baseClass} ${
      location.pathname === path ? activeClass : inactiveClass
    }`;
  };

  return (
    <>
      {/* Nav Desktop */}
      <div className="hidden tablet:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 tablet:h-[60px] tablet:px-6">
            <Link to="/admin" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">VMO Admin</span>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium tablet:px-4">
              <Link to="/admin" className={getLinkClass("/admin")}>
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/admin/manageMembers"
                className={getLinkClass("/admin/manageMembers")}
              >
                <ShoppingCart className="h-4 w-4" />
                Manage members
              </Link>
              <Link
                to="/admin/manageOrganizationManagers"
                className={getLinkClass("/admin/manageOrganizationManagers")}
              >
                <Package className="h-4 w-4" />
                Manage organization managers
              </Link>
              <Link
                to="/admin/manageRequestManagers"
                className={getLinkClass("/admin/manageRequestManagers")}
              >
                <Users className="h-4 w-4" />
                Manage request managers
              </Link>
              <Link
                to="/admin/manageUsers"
                className={getLinkClass("/admin/manageUsers")}
              >
                <LineChart className="h-4 w-4" />
                Manage users
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
