import React, { useContext } from "react";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
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

const DesktopNavLeft = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="mr-4 gap-2 flex items-center">
      <Link to="/">
        <Button variant="ghost" className="h-20 w-20 rounded-full">
          <Avatar className="h-20 w-20">
            <AvatarImage src={logo_img} alt="VMO-LOGO" />
            <AvatarFallback>VMO-LOGO</AvatarFallback>
          </Avatar>
        </Button>
      </Link>
      <Link to="/home">
        <Button variant="ghost">Trang chủ</Button>
      </Link>
      <NavigationMenu className="list-none">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Mở rộng</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-6 mobile:w-[400px]">
              <ListItem to="/introduction" title="Giới thiệu" icon={HandHeart}>
                Trang giới thiệu chung về ứng dụng VMO
              </ListItem>
              <ListItem to="/viewCampaigns" title="Chiến dịch" icon={Goal}>
                Trang xem tổng quan các chiến dịch đang diễn ra
              </ListItem>
              <ListItem to="/news" title="Tin tức" icon={Newspaper}>
                Trang xem các tin tức thiện nguyện mới nhất
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>

      {/* check role có phải Member không mới hiển thị */}
      {user?.role === "Member" && user.is_verified === "True" ? (
        <Link to="/manage/allCampaigns">
          <Button variant="feature">Quản lí</Button>
        </Link>
      ) : (
        ""
      )}
      {/* check role có phải OrganizationManager không mới hiển thị */}
      {user?.role === "OrganizationManager" && user.is_verified === "True" ? (
        <Link to="/manage/organize/allOrganizations">
          <Button variant="feature">Quản lí tổ chức</Button>
        </Link>
      ) : (
        ""
      )}
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
