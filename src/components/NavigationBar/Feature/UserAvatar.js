import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import avatar_image from "../../../assets/avatars/02.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const UserAvatar = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar_image} alt="Avatar User" />
            <AvatarFallback>Bi</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">UserName</p>
            <p className="text-xs leading-none text-muted-foreground">
              userEmail@email.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>

            <Link to="/viewProfile">
              Xem trang cá nhân
            </Link>

          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/editProfile">
              Chỉnh sửa thông tin cá nhân
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
          <DropdownMenuItem>
          
          <Link to="/changePassword">Đổi mật khẩu</Link>

          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={() => {
          logOut()
        }}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
