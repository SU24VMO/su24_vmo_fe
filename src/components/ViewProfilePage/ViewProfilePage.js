import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AuthContext } from "../../context/AuthContext";
import { axiosPrivate, axiosPublic } from "../../api/axiosInstance";
import image_placeholder from "../../assets/images/placeholder.svg";
import { GET_ACCOUNT_BY_ID } from "../../api/apiConstants";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SkeletonProfile from "./SkeletonProfile/SkeletonProfile";
import { Helmet } from "react-helmet";
import emailIcon from "../../assets/icons/EmailIcon.svg";
import facebookIcon from "../../assets/icons/FacebookIcon.svg";
import tiktokIcon from "../../assets/icons/TiktokIcon.svg";
import youtubeIcon from "../../assets/icons/YoutubeIcon.svg";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import TransactionsPaid from "./TransactionsPaid/TransactionsPaid";
import TransactionsPending from "./TransactionsPending/TransactionsPending";

export default function ViewProfilePage() {
  const { toast } = useToast();
  const [data, setData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  // Hàm xử lý khi click vào các icon mạng xã hội
  const handleSocialMediaRedirect = (link) => {
    if (link === "") {
      toast({
        variant: "destructive",
        title: `Tài khoản chưa thiết lập thông tin này!`,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } else {
      window.open(link, "_blank");
    }
  };

  // Hàm format số tiền ủng hộ
  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng cuộn nhẹ
    });
    async function fetchData() {
      try {
        const response = await axiosPrivate.get(
          GET_ACCOUNT_BY_ID + `${user.account_id}?accountId=${user.account_id}`
        );
        if (response.status === 200) {
          setData(response.data.data);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    }
    fetchData();
  }, [user.account_id]); // Chỉ gọi lại khi user.account_id thay đổi
  console.log("data profile người dùng:", data);

  return (
    <>
      <Helmet>
        <title>Trang cá nhân • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="w-4/5 mx-auto rounded-xl">
        {dataLoaded ? (
          <div className="grid gap-6 tablet:grid-cols-2 rounded-xl p-10 drop-shadow-lg ">
            <div className=" justify-center mobile:justify-evenly mobile:flex  gap-4 items-center">
              <div className="rounded-full flex justify-center">
                <Avatar className="h-36 w-36">
                  <AvatarImage
                    src={user ? user.avatar : image_placeholder}
                    alt="Avatar User"
                  />
                  <AvatarFallback>{user.lastname[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-center">
                <div className="">
                  <h1 className=" text-sx w-full text-center mobile:text-left mobile:text-xl font-bold my-2">
                    {data.username}
                  </h1>
                  <p className="font-normal my-2 text-sm text-center mobile:text-left w-full mobile:text-base">
                    {data.email}
                  </p>
                  <p className="font-normal my-2 text-sm text-center mobile:text-left w-full mobile:text-base">
                    {/* Tham gia từ:<span> 3/2024</span> */}
                    {`Tham gia từ: ${format(
                      new Date(data.createdAt),
                      "MM/yyyy"
                    )}`}
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-normal my-2 text-sm text-center mobile:text-left w-full mobile:text-base">
                      Xem thêm thông tin tài khoản tại:
                    </p>
                    <div className="w-full flex justify-between">
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                          handleSocialMediaRedirect(`mailto:${user.email}`)
                        }
                      >
                        <img src={emailIcon} alt="" className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                          handleSocialMediaRedirect(user.facebooklink)
                        }
                      >
                        <img src={facebookIcon} alt="" className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                          handleSocialMediaRedirect(user.tiktoklink)
                        }
                      >
                        <img src={tiktokIcon} alt="" className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                          handleSocialMediaRedirect(user.youtubelink)
                        }
                      >
                        <img src={youtubeIcon} alt="" className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mobile:flex justify-around gap-4 items-center">
              <div className="text-center">
                <h1 className=" text-sx mobile:text-xl font-bold">
                  {formatMoney(data.donatedMoney)} VNĐ
                </h1>
                <span className="text-sm mobile:text-sx ">Số tiền ủng hộ</span>
              </div>
              <div className="text-center">
                <h1 className=" text-sx mobile:text-xl font-bold">
                  {data.numberOfDonations}
                </h1>
                <span className="  text-sm mobile:text-sx">Lượt ủng hộ</span>
              </div>
              <div className="text-center">
                <h1 className=" text-sx mobile:text-xl font-bold">
                  {data.role === 0
                    ? "Admin"
                    : data.role === 1
                    ? "Người dùng"
                    : data.role === 2
                    ? "Tình nguyện viên"
                    : data.role === 3
                    ? "Quản lý tổ chức"
                    : data.role === 4
                    ? "Người kiểm duyệt"
                    : "Chưa xác định"}
                </h1>
                <span className="  text-sm mobile:text-sx">Loại tài khoản</span>
              </div>
            </div>
          </div>
        ) : (
          <SkeletonProfile />
        )}
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
            <svg
              className="w-4 h-4 text-gray-700 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-sx mobile:text-xl  font-bold my-2">
            Ủng hộ của tôi:
          </h1>
        </div>
        <Tabs defaultValue="paid" className="w-full">
          <TabsList>
            <TabsTrigger value="paid">Đã thanh toán</TabsTrigger>
            <TabsTrigger value="pending">Chưa thanh toán</TabsTrigger>
          </TabsList>
          <TabsContent value="paid">
            <TransactionsPaid accountId={user.account_id}/>
          </TabsContent>
          <TabsContent value="pending">
            <TransactionsPending accountId={user.account_id}/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
