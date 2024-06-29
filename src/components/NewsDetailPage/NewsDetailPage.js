import React from "react";
import { axiosPublic } from "../../api/axiosInstance";
import { GET_POST_BY_ID } from "../../api/apiConstants";
import { Helmet } from "react-helmet";
import { Navigate, useParams } from "react-router-dom";
import NewDetailSkeleton from "./NewDetailSkeleton/NewDetailSkeleton";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = React.useState(null);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { toast } = useToast();

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString)
      .toLocaleDateString("vi-VN", options)
      .replace("thg", "Thg");
  };

  // Hàm lấy dữ liệu notification từ API
  const fetchData = React.useCallback(async (id) => {
    if (!id) {
      setError(true); // Nếu không có id, set lỗi
      return;
    }
    toast({
      title: "Đang tải dữ liệu tin tức...",
      description: "Vui lòng chờ đợi trong giây lát !",
      action: <ToastAction altText="undo">Ẩn</ToastAction>,
    });
    try {
      const response = await axiosPublic.get(`${GET_POST_BY_ID}${id}`);
      if (response.status === 200) {
        setNews(response.data.data);
        setDataLoaded(true);
        toast({
          title: "Đã lấy dữ liệu tin tức thành công!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        // console.log("Thông báo get được: ", response.data.data);
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi !",
          description:
            "Có thể chiến dịch ban đầu đã bị xóa hoặc không tồn tại !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        setError(true); // Nếu response không thành công, set lỗi
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi !",
        description: "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      console.error("Error fetching data from API:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  if (error) {
    return <Navigate to="/404" />; // Redirect người dùng nếu có lỗi
  }

  return (
    <div>
      <Helmet>
        <title>
          Nền tảng Thiện nguyện của MB được vinh danh tại Human Act Prize 2023
        </title>
        <meta
          name="description"
          content="Tin tức về nền tảng Thiện nguyện của MB được vinh danh tại Human Act Prize 2023"
        />
      </Helmet>
      <div className="container mx-auto px-4 my-4">
        {dataLoaded ? (
          <div className="w-4/5 mx-auto ">
            <div
              className="bg-gray-100 w-full h-48 tablet:h-96 flex justify-center rounded-xl bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${news.cover})` }}
            ></div>
            <div>
              <p className="text-sm text-gray-400 my-4">
                {formatDate(news.createAt)}
              </p>
              <h1 className="text-xl mobile:text-3xl font-bold mb-6 text-justify">
                {news.title}
              </h1>
              <p className="my-3 text-sx mobile:text-xl font-bold text-justify">
                {news.content}
              </p>
              <div className="flex justify-center my-10 w-full ">
                <img className=" w-1/2 h-1/2" src={news.image} alt="" />
              </div>
              <p className="text-sm text-justify">{news.description}</p>

              <div className="flex justify-end text-end pr-10 my-5">
                <div className="flex-col">
                  <h3 className="font-bold">Tác giả</h3>
                  <div className="text-center">
                    <span className="">{news.authorName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-10">
            <NewDetailSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
