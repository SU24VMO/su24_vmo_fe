import { useContext, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import SearchBar from "../Feature/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import logo_img from "../../../assets/images/logo1.svg";
import { AuthContext } from "../../../context/AuthContext";
import { Skeleton } from "../../ui/skeleton";

const MobileNavLeft = () => {
  const [open, setOpen] = useState(false);
  const { user, isLogin, loading } = useContext(AuthContext);
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
                className={
                  "w-full items-start justify-start" +
                  getLinkClass(["/", "/home"])
                }
              >
                Trang chủ
              </Button>
            </Link>
            <Link to="/introduction">
              <Button
                variant="ghost"
                className={
                  "w-full items-start my-3 justify-start" +
                  getLinkClass(["/introduction"])
                }
              >
                Giới thiệu
              </Button>
            </Link>
            <Link to="/viewCampaigns">
              <Button
                variant="ghost"
                className={
                  "w-full items-start justify-start" +
                  getLinkClass(["/viewCampaigns"])
                }
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
                    className={
                      "w-full items-start justify-start" +
                      getLinkClass(["/login"])
                    }
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="ghost"
                    className={
                      "w-full items-start justify-start" +
                      getLinkClass(["/signup"])
                    }
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </>
          )}

          <>
            {loading ? (
              <>
                <Separator className="mb-5" />
                <div className="w-full mb-5">
                  <Skeleton className="w-full h-8 rounded-lg" />
                </div>
              </>
            ) : (
              <>
                {user?.role === "Volunteer" && user.is_verified ? (
                  <>
                    <Separator className="mb-5" />
                    <div className="w-full mb-5">
                      <Link to="/manage/volunteer/allCampaigns">
                        <Button
                          variant="ghost"
                          className={
                            "w-full items-start justify-start" +
                            getLinkClass([
                              "/manage/volunteer/allCampaigns",
                              "/manage/volunteer/allNews",
                              "/manage/volunteer/allPhase1",
                              "/manage/volunteer/allPhase2",
                              "/manage/volunteer/allPhase3",
                              "/manage/volunteer/allActivities",
                            ])
                          }
                        >
                          Quản lý
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {user?.role === "Member" && user.is_verified === "False" ? (
                  <>
                    <Separator className="mb-5" />
                    <div className="w-full mb-5">
                      <Link to="/createVerifyVolunteer">
                        <Button
                          variant="ghost"
                          className={
                            "w-full items-start justify-start" +
                            getLinkClass(["/createVerifyVolunteer"])
                          }
                        >
                          Đăng kí tình nguyện viên
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
                          variant="ghost"
                          className={
                            "w-full items-start justify-start" +
                            getLinkClass([
                              "/manage/organize/allOrganizations",
                              "/manage/organize/allCampaigns",
                              "/manage/organize/allNews",
                              "/manage/organize/allPhase1",
                              "/manage/organize/allPhase2",
                              "/manage/organize/allPhase3",
                              "/manage/organize/allActivities",
                            ])
                          }
                        >
                          Quản lý tổ chức
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {user?.role === "OrganizationManager" &&
                user.is_verified === "False" ? (
                  <Link to="/createVerifyOrganizationManager">
                    <Button
                      variant="ghost"
                      className={getLinkClass([
                        "/createVerifyOrganizationManager",
                      ])}
                    >
                      Đăng kí quản lý tổ chức
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </>
            )}
          </>

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
