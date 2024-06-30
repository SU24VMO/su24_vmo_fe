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
import { axiosPrivate } from "../../../api/axiosInstance";
import {
  GET_ACCOUNT_BY_ID,
  GET_NOTIFICATIONS,
  UPDATE_NOTIFICATION_SEEN,
} from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";
import { ScrollArea } from "../../ui/scroll-area";
import NotificationSkeleton from "./NotificationSkeleton/NotificationSkeleton";
import { format } from "date-fns";
import { useToast } from "../../ui/use-toast";
import { ToastAction } from "../../ui/toast";

const Notification = () => {
  const { user } = React.useContext(AuthContext);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [pageNo, setPageNo] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const { toast } = useToast();

  // Mục đích là lấy ra tổng số lượng notification chưa đọc
  React.useEffect(() => {
    async function fetchUnreadNotification() {
      try {
        const response = await axiosPrivate.get(
          GET_ACCOUNT_BY_ID + `${user.account_id}?accountId=${user.account_id}`
        );
        if (response.status === 200) {
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
    fetchUnreadNotification();
  }, [user.account_id]); // Chỉ gọi lại khi user.account_id thay đổi

  // Hàm lấy dữ liệu notification từ API
  const fetchData = React.useCallback(
    async (page) => {
      try {
        const response = await axiosPrivate.get(
          `${GET_NOTIFICATIONS}${user.account_id}?pageSize=10&pageNo=${page}`
        );
        if (response.status === 200) {
          const fetchedData = response.data.data.list;
          if (fetchedData.length === 0) {
            setHasMore(false);
          } else if (page > 1) {
            setData((prevData) => [...prevData, ...fetchedData]);
          } else {
            setData(fetchedData);
          }
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      } finally {
        setLoadingMore(false);
      }
    },
    [user.account_id]
  );

  // Lấy dữ liệu notification từ API
  React.useEffect(() => {
    fetchData(1);
  }, [fetchData]); // Chỉ gọi lại khi fetchData thay đổi (thực ra nó chỉ chạy 1 lần duy nhất vì fetchData không thay đổi =)))

  // Chức năng load more (xem thêm notification)
  const handleLoadMore = () => {
    setLoadingMore(true);
    setPageNo((prevPageNo) => prevPageNo + 1);
    fetchData(pageNo + 1);
  };

  // Cập nhật trạng thái đã đọc notification
  const updateAllNotificationsToSeen = async () => {
    setDataLoaded(false); // Bật skeleton
    try {
      const response = await axiosPrivate.put(
        `${UPDATE_NOTIFICATION_SEEN}?accountId=${user.account_id}`
      );
      if (response.status === 200) {
        // Hiển thị toast thông báo thành công
        toast({
          title: "Đã đánh dấu tất cả thông báo là đã đọc!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        // Cập nhật lại dữ liệu trên giao diện hoặc chỉ đơn giản là set dataLoaded thành true và unreadCount thành 0
        setUnreadCount(0);
        fetchData(1); // Hoặc gọi lại hàm fetchData để cập nhật lại dữ liệu trên giao diện
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông báo:", error);
    } finally {
      setDataLoaded(true); // Tắt skeleton
    }
  };
  // console.log("Các notifications: ", data);
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
              className={`px-1 py-1 leading-none text-red-500 ${
                !dataLoaded && "disabled"
              }`}
              onClick={updateAllNotificationsToSeen}
              disabled={!dataLoaded} // Disable nút này khi dataLoaded là false
            >
              Đánh dấu đã đọc
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dataLoaded ? (
            <ScrollArea className="h-80 rounded-md border p-3">
              {data.map((noti) => (
                <NotificationItem
                  key={noti.notificationID}
                  content={noti.content}
                  createDate={noti.createDate}
                  status={noti.isSeen ? "Đã đọc" : "Chưa đọc"}
                />
              ))}
              {loadingMore ? (
                <NotificationSkeleton />
              ) : hasMore ? (
                <Button
                  variant="ghost"
                  onClick={handleLoadMore}
                  className="w-full mt-2"
                >
                  Xem thêm
                </Button>
              ) : (
                <p className="text-center text-sm font-medium mt-2">Đã tải hết thông báo!</p> // Hiển thị khi đã tải hết dữ liệu
              )}
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
            {
              // Nếu status là "Chưa đọc" thì hiển thị màu đỏ, ngược lại thì màu xanh
              status === "Chưa đọc" ? (
                <p className="text-red-500 font-medium">{status}</p>
              ) : (
                <p className="text-green-500 font-medium">{status}</p>
              )
            }
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </div>
  );
};
