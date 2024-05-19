import React from "react";
import { Button } from "../../ui/button";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-5 w-5 rounded-full"
          size="icon"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-none">Thông báo</p>
            <Button
              variant="ghost"
              className="px-1 py-1 leading-none text-red-500"
            >
              Đánh dấu đã đọc
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NotificationItem
            content={"Nội dung thông báo"}
            createDate={"Ngày tạo"}
            status={"Đã đọc"}
          />
          <NotificationItem
            content={"Nội dung thông báo"}
            createDate={"Ngày tạo"}
            status={"Chưa đọc"}
          />
          <NotificationItem
            content={"Nội dung thông báo"}
            createDate={"Ngày tạo"}
            status={"Đã đọc"}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;

const NotificationItem = ({ content, createDate, status }) => {
  return (
    <div>
      <DropdownMenuItem>
        <div className="flex flex-col w-full">
          <p>{content}</p>
          <div className="flex justify-between">
            <p className="text-muted-foreground">{createDate}</p>
            <p className="text-muted-foreground">{status}</p>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </div>
  );
};
