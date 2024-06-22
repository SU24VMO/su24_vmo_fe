import React from "react";
import { Button } from "../../ui/button";
import { Bell, BellDot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { axiosPrivate } from "../../../api/axiosInstance";
import { GET_ACCOUNT_BY_ID } from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";
import { ScrollArea } from "../../ui/scroll-area";
import NotificationSkeleton from "./NotificationSkeleton/NotificationSkeleton";
import { format } from "date-fns";

const Notification = () => {
  const { user } = React.useContext(AuthContext);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get(
          GET_ACCOUNT_BY_ID + `${user.account_id}?accountId=${user.account_id}`
        );
        if (response.status === 200) {
          setData(response.data.data.notifications);
          setDataLoaded(true);
          // Tính toán số lượng isSeen: false
          const unread = response.data.data.notifications.reduce(
            (acc, noti) => acc + (noti.isSeen ? 0 : 1),
            0
          );
          setUnreadCount(unread); // Cập nhật state với tổng số lượng tính được
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    }
    fetchData();
  }, [user.account_id]); // Chỉ gọi lại khi user.account_id thay đổi

  console.log("Các notifications: ", data);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-5 w-5 rounded-full"
          size="icon"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-[-10px] right-[-5px] rounded-full bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
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
          {dataLoaded ? (
            <ScrollArea className="h-80 rounded-md border">
              {data.map((noti) => (
                <NotificationItem
                  key={noti.notificationID}
                  content={noti.content}
                  createDate={noti.createDate}
                  status={noti.isSeen ? "Đã đọc" : "Chưa đọc"}
                />
              ))}
            </ScrollArea>
          ) : (
            <NotificationSkeleton />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;

const NotificationItem = ({ content, createDate, status }) => {
  const formattedDate = format(new Date(createDate), "yyyy-MM-dd HH:mm a");
  return (
    <div>
      <DropdownMenuItem>
        <div className="flex flex-col w-full">
          <p>{content}</p>
          <div className="flex justify-between mt-3">
            <p className="text-muted-foreground">{formattedDate}</p>
            <p className="text-muted-foreground">{status}</p>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </div>
  );
};
