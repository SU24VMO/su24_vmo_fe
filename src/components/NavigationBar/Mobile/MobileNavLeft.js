import { useContext, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import SearchBar from "../Feature/SearchBar";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import logo_img from "../../../assets/images/logo1.svg";
import { AuthContext } from "../../../context/AuthContext";

const MobileNavLeft = () => {
  const [open, setOpen] = useState(false);
  const { user, isLogin } = useContext(AuthContext);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col items-start">
          <Link to="/">
            <Button variant="ghost" className="h-20 w-20 rounded-full">
              <Avatar className="h-20 w-20">
                <AvatarImage src={logo_img} alt="VMO-LOGO" />
                <AvatarFallback>VMO-LOGO</AvatarFallback>
              </Avatar>
            </Button>
          </Link>
          <div className="w-full mb-5">
            <Link to="/home">
              <Button
                variant="ghost"
                className="w-full items-start justify-start"
              >
                Trang chủ
              </Button>
            </Link>
            <Link to="/introduction">
              <Button
                variant="ghost"
                className="w-full items-start justify-start"
              >
                Giới thiệu
              </Button>
            </Link>
            <Link to="/viewCampaigns">
              <Button
                variant="ghost"
                className="w-full items-start justify-start"
              >
                Chiến dịch
              </Button>
            </Link>
          </div>
          {isLogin ? (
            ""
          ) : (
            <>
              <Separator className="mb-5" />
              <div className="w-full">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="w-full items-start justify-start"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="ghost"
                    className="w-full items-start justify-start"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </>
          )}

          {user?.role === "Member" && user.is_verified ? (
            <>
              <Separator className="mb-5" />
              <div className="w-full mb-5">
                <Link to="/manage/allCampaigns">
                  <Button
                    variant="feature"
                    className="w-full items-start justify-start"
                  >
                    Quản lý
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
          {user?.role === "OrganizationManager" && user.is_verified ? (
            <>
              <Separator className="mb-5" />
              <div className="w-full mb-5">
                <Link to="/manage/organize/allOrganizations">
                  <Button
                    variant="feature"
                    className="w-full items-start justify-start"
                  >
                    Quản lí tổ chức
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
          <Separator className="mb-5" />
          <div className="w-full">
            <SearchBar />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavLeft;
