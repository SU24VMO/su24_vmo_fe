import React, { useContext } from "react";
import { Button } from "../../ui/button";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import logo_img from "../../../assets/images/logo1.svg";
import { HandHeart, Goal, Newspaper } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { cn } from "../../../lib/utils";
import { AuthContext } from "../../../context/AuthContext";
import { Skeleton } from "../../ui/skeleton";

const DesktopNavLeft = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Hàm kiểm tra và trả về class tương ứng
  const getLinkClass = (paths) => {
    const baseClass = "";
    const activeClass = "bg-muted text-foreground hover:text-foreground";
    const inactiveClass = "";
    return `${baseClass} ${
      paths.includes(location.pathname) ? activeClass : inactiveClass
    }`;
  };

  return (
    <div className="mr-4 gap-4 flex items-center">
      <Link to="/">
        <Button variant="ghost" className="h-20 w-20 rounded-full">
          <Avatar className="h-20 w-20">
            <AvatarImage src={logo_img} alt="VMO-LOGO" />
            <AvatarFallback>VMO-LOGO</AvatarFallback>
          </Avatar>
        </Button>
      </Link>
      <Link to="/home">
        <Button variant="ghost" className={getLinkClass(["/", "/home"])}>
          Trang chủ
        </Button>
      </Link>
      <NavigationMenu className="list-none">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={getLinkClass([
              "/introduction",
              "/viewCampaigns",
              "/news",
            ])}
          >
            Mở rộng
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-6 mobile:w-[400px] space-y-3">
              <ListItem
                to="/introduction"
                title="Giới thiệu"
                icon={HandHeart}
                className={getLinkClass(["/introduction"])}
              >
                Trang giới thiệu chung về ứng dụng VMO
              </ListItem>
              <ListItem
                to="/viewCampaigns"
                title="Chiến dịch"
                icon={Goal}
                className={getLinkClass(["/viewCampaigns"])}
              >
                Trang xem tổng quan các chiến dịch đang diễn ra
              </ListItem>
              <ListItem
                to="/news"
                title="Tin tức"
                icon={Newspaper}
                className={getLinkClass(["/news"])}
              >
                Trang xem các tin tức thiện nguyện mới nhất
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>

      <>
        {loading ? (
          <Skeleton className="w-40 h-8 rounded-lg" />
        ) : (
          <>
            {/* Check if role is Volunteer and is verified */}
            {user?.role === "Volunteer" && user.is_verified === "True" ? (
              <Link to="/manage/volunteer/allCampaigns">
                <Button
                  variant="ghost"
                  className={getLinkClass([
                    "/manage/volunteer/allCampaigns",
                    "/manage/volunteer/allNews",
                    "/manage/volunteer/allPhase1",
                    "/manage/volunteer/allPhase2",
                    "/manage/volunteer/allPhase3",
                    "/manage/volunteer/allActivities",
                  ])}
                >
                  Quản lý
                </Button>
              </Link>
            ) : null}

            {/* Check if role is OrganizationManager and is verified */}
            {user?.role === "OrganizationManager" &&
            user.is_verified === "True" ? (
              <Link to="/manage/organize/allOrganizations">
                <Button
                  variant="ghost"
                  className={getLinkClass([
                    "/manage/organize/allOrganizations",
                    "/manage/organize/allCampaigns",
                    "/manage/organize/allNews",
                    "/manage/organize/allPhase1",
                    "/manage/organize/allPhase2",
                    "/manage/organize/allPhase3",
                    "/manage/organize/allActivities",
                  ])}
                >
                  Quản lý tổ chức
                </Button>
              </Link>
            ) : null}

            {/* Uncommented and corrected the Member check */}
            {/* {user?.role === "Member" && user.is_verified === "False" ? (
            <Link to="/createVerifyVolunteer">
              <Button variant="ghost" className={getLinkClass(["/createVerifyVolunteer"])}>Đăng kí tình nguyện viên</Button>
            </Link>
          ) : null} */}

            {/* Check if role is OrganizationManager and is not verified */}
            {user?.role === "OrganizationManager" &&
            user.is_verified === "False" ? (
              <Link to="/createVerifyOrganizationManager">
                <Button
                  variant="ghost"
                  className={getLinkClass(["/createVerifyOrganizationManager"])}

                >
                  Đăng kí quản lý tổ chức
                </Button>
              </Link>
            ) : null}
          </>
        )}
      </>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, children, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center text-sm font-medium leading-none">
              {Icon && <Icon className="w-6 h-6 mr-2" />}
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default DesktopNavLeft;
