import React from "react";
import { axiosPublic } from "../../api/axiosInstance";
import { GET_POST_BY_ID } from "../../api/apiConstants";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import NewDetailSkeleton from "./NewDetailSkeleton/NewDetailSkeleton";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = React.useState(null);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString)
      .toLocaleDateString("vi-VN", options)
      .replace("thg", "Thg");
  };

  // Hàm lấy dữ liệu notification từ API
  const fetchData = React.useCallback(async (id) => {
    try {
      const response = await axiosPublic.get(`${GET_POST_BY_ID}${id}`);
      if (response.status === 200) {
        setNews(response.data.data);
        setDataLoaded(true);
        console.log("Thông báo get được: ", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

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
            <NewDetailSkeleton/>
          </div>
        )}
      </div>
    </div>
  );
}
