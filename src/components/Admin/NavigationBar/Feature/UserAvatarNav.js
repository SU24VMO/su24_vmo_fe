import { AuthContext } from "../../../../context/AuthContext";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import React, { useContext } from "react";

const UserAvatarNav = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tài khoản Admin</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => {
              logOut();
            }}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatarNav;
