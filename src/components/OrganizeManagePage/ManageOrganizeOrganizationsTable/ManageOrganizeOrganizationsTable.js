import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";

async function getData() {
  // Fetch data from your API here.
  const data = [
    {
      id: "1",
      organizeStatus: "Đang hoạt động",
      organizeName: "Tổ chức ABC",
      dateCreate: "21:29:56 - 19/05/2024",
    },
    {
      id: "2",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "20:06:00 - 19/05/2024",
    },
    {
      id: "3",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "19:53:22 - 19/05/2024",
    },
    {
      id: "4",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "17:47:26 - 19/05/2024",
    },
    {
      id: "5",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "16:06:30 - 19/05/2024",
    },
    {
      id: "6",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "07:10:59 - 20/05/2024",
    },
    {
      id: "7",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "07:10:59 - 20/05/2024",
    },
    {
      id: "8",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "07:01:41 - 20/05/2024",
    },
    {
      id: "9",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "23:59:16 - 19/05/2024",
    },
    {
      id: "10",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "22:08:57 - 19/05/2024",
    },
    {
      id: "11",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "11:54:37 - 20/05/2024",
    },
    {
      id: "12",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "10:55:29 - 20/05/2024",
    },
    {
      id: "13",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "09:24:05 - 20/05/2024",
    },
    {
      id: "14",
      organizeName: "Tổ chức XYZ",
      organizeStatus: "Đang hoạt động",
      dateCreate: "08:55:05 - 20/05/2024",
    },
    {
      id: "15",
      organizeName: "Tổ chức ABC",
      organizeStatus: "Đang hoạt động",
      dateCreate: "08:44:54 - 20/05/2024",
    },
    // ... other data items ...
  ];

  return data.map((item, index) => ({
    ...item,
    numericalOrder: index + 1,
  }));
}

const ManageOrganizeOrganizationsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="w-3/4 mx-auto">
      <ManageOrganizeSlideBar></ManageOrganizeSlideBar>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ManageOrganizeOrganizationsTable;
