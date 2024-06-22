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
  const { logOut, user } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user ? user.avatar : avatar_image}
              alt="Avatar User"
            />
            <AvatarFallback>{user.lastname[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/viewProfile" className="w-full">
            <DropdownMenuItem className="w-full cursor-pointer">
              Xem trang cá nhân
            </DropdownMenuItem>
          </Link>
          <Link to="/editProfile" className="w-full">
            <DropdownMenuItem className="w-full cursor-pointer">
              Chỉnh sửa thông tin cá nhân
            </DropdownMenuItem>
          </Link>
          <Link to="/changePassword" className="w-full">
            <DropdownMenuItem className="w-full cursor-pointer">
              Đổi mật khẩu
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 w-full cursor-pointer"
          onClick={() => {
            logOut();
          }}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
