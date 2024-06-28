import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";
import { Helmet } from "react-helmet";

async function getData() {
  // Fetch data from your API here.
  const data = [
    {
      id: "1",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      statusCampaign:"Đã kết thúc",
      organizeName: "Tổ chức ABC",
      datePost: "21:29:56 - 19/05/2024",
    },
    {
      id: "2",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "20:06:00 - 19/05/2024",
    },
    {
      id: "3",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "19:53:22 - 19/05/2024",
    },
    {
      id: "4",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "17:47:26 - 19/05/2024",
    },
    {
      id: "5",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "16:06:30 - 19/05/2024",
    },
    {
      id: "6",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "07:10:59 - 20/05/2024",
    },
    {
      id: "7",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "07:10:59 - 20/05/2024",
    },
    {
      id: "8",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "07:01:41 - 20/05/2024",
    },
    {
      id: "9",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "23:59:16 - 19/05/2024",
    },
    {
      id: "10",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "22:08:57 - 19/05/2024",
    },
    {
      id: "11",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "11:54:37 - 20/05/2024",
    },
    {
      id: "12",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "10:55:29 - 20/05/2024",
    },
    {
      id: "13",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "09:24:05 - 20/05/2024",
    },
    {
      id: "14",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      statusCampaign:"Đã kết thúc",
      datePost: "08:55:05 - 20/05/2024",
    },  
    {
      id: "15",
      nameOfPost: "Ngày hoạt động đầu tiên sau nhiều ngày chờ đợi",
      statusPost: "Hợp lệ",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      statusCampaign:"Đã kết thúc",
      datePost: "08:44:54 - 20/05/2024",
    },
    // ... other data items ...
  ];
  
  return data.map((item, index) => ({
    ...item,
    numericalOrder: index + 1,
  }));
  
}


const ManageOrganizeAllActivitiesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Quản lý các hoạt động • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
    <div className="w-3/4 mx-auto">
      <ManageOrganizeSlideBar></ManageOrganizeSlideBar>
      <DataTable columns={columns} data={data} />
    </div>
    </>
  );
};

export default ManageOrganizeAllActivitiesTable;
