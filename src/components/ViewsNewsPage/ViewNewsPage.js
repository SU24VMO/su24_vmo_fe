/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ViewNewsSkeleton from "./ViewNewsSkeleton/ViewNewsSkeleton";
import NewCard from "./NewCard/NewCard";
import { useToast } from "../ui/use-toast";
import { GET_ALL_POST } from "../../api/apiConstants";
import { axiosPublic } from "../../api/axiosInstance";
import { ToastAction } from "../ui/toast";
import { Button } from "../ui/button";
import { CheckCheck } from "lucide-react";

export default function ViewNewsPage() {
  const { toast } = useToast();
  const [data, setData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  // Lấy dữ liệu các post từ API
  // Sử dụng useCallback để đảm bảo fetchData không thay đổi trên mỗi render
  const fetchData = React.useCallback(
    async (page) => {
      if (!hasMore) return;
      setLoadingMore(true);
      try {
        let url = `${GET_ALL_POST}?pageSize=4&pageNo=${page}`;
        const response = await axiosPublic.get(url);
        toast({
          title: "Đang tải dữ liệu tin tức...",
          description: "Vui lòng chờ đợi trong giây lát !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        if (response.status === 200) {
          const fetchedData = response.data.data.list;
          console.log("Dữ liệu tin tức get được: ", fetchedData);
          if (fetchedData.length === 0) {
            setHasMore(false);
          } else if (page > 1) {
            setData((prevData) => [...prevData, ...fetchedData]);
          } else {
            setData(fetchedData);
          }
          toast({
            title: "Tải dữ liệu các tin tức thành công!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          setDataLoaded(true);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi !",
          description:
            "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } finally {
        setLoadingMore(false);
      }
    },
    [hasMore, toast]
  ); // Thêm các dependencies cần thiết

  // Lấy dữ liệu notification từ API
  React.useEffect(() => {
    fetchData(1);
  }, [fetchData]); // Chỉ gọi lại khi fetchData thay đổi (thực ra nó chỉ chạy 1 lần duy nhất vì fetchData không thay đổi =)))

  // Hàm xử lý khi nhấn nút Xem Thêm
  const handleLoadMore = () => {
    setLoadingMore(true);
    setPageNo((prevPageNo) => prevPageNo + 1);
    fetchData(pageNo + 1);
  };

  return (
    <>
      <Helmet>
        <title>Danh sách các tin tức • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="w-4/5 mx-auto">
        <div className="bg-white dark:bg-gray-800  py-6 mobile:py-8 laptop:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 tablet:px-8">
            <div className="mb-4 flex items-center justify-between gap-8 mobile:mb-8 tablet:mb-12">
              <div className="flex items-center gap-12">
                <h2 className="text-2xl font-bold text-gray-800 laptop:text-3xl dark:text-white">
                  Tin tức
                </h2>
              </div>
            </div>
            {dataLoaded ? (
              <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-6 xl:gap-8">
                {data.map((item, index) => (
                  <NewCard
                    key={item.postID}
                    index={index}
                    title={item.title}
                    imageUrl={item.cover}
                    date={item.createAt}
                    postId={item.postID}
                  />
                ))}
              </div>
            ) : (
              <ViewNewsSkeleton />
            )}
          </div>
        </div>
        {/* Button Xem thêm */}
        {loadingMore ? (
          <ViewNewsSkeleton />
        ) : hasMore ? ( // Kiểm tra nếu còn dữ liệu thì hiển thị nút Xem Thêm
          <div className="flex items-center justify-center my-10">
            <Button
              variant="default"
              className="tablet:text-lg"
              onClick={handleLoadMore}
            >
              Xem Thêm
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center my-10 text-lg font-medium">
            Bạn đã xem hết các tin tức
            <CheckCheck className="text-green-600 h-8 w-8" />
          </div>
        )}
      </div>
    </>
  );
}
