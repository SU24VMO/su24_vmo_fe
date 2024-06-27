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
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "21:29:56 - 19/05/2024",
    },
    {
      id: "2",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "20:06:00 - 19/05/2024",
    },
    {
      id: "3",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "19:53:22 - 19/05/2024",
    },
    {
      id: "4",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "17:47:26 - 19/05/2024",
    },
    {
      id: "5",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "16:06:30 - 19/05/2024",
    },
    {
      id: "6",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "07:10:59 - 20/05/2024",
    },
    {
      id: "7",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "07:10:59 - 20/05/2024",
    },
    {
      id: "8",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "07:01:41 - 20/05/2024",
    },
    {
      id: "9",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "23:59:16 - 19/05/2024",
    },
    {
      id: "10",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "22:08:57 - 19/05/2024",
    },
    {
      id: "11",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "11:54:37 - 20/05/2024",
    },
    {
      id: "12",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "10:55:29 - 20/05/2024",
    },
    {
      id: "13",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "09:24:05 - 20/05/2024",
    },
    {
      id: "14",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức XYZ",
      newStatus: "Đã duyệt",
      dateCreate: "08:55:05 - 20/05/2024",
    },
    {
      id: "15",
      newTitle: "Tin tức mới 1",
      organizeName: "Tổ chức ABC",
      newStatus: "Đã duyệt",
      dateCreate: "08:44:54 - 20/05/2024",
    },
    // ... other data items ...
  ];

  return data.map((item, index) => ({
    ...item,
    numericalOrder: index + 1,
  }));
}

const ManageOrganizeNewsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Quản lý các tin tức • VMO</title>
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

export default ManageOrganizeNewsTable;
