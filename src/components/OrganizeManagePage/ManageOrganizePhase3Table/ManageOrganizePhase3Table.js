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
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 30000,
      donationDate: "21:29:56 - 19/05/2024",
    },
    {
      id: "2",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 10000,
      donationDate: "20:06:00 - 19/05/2024",
    },
    {
      id: "3",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 1000000000000,
      donationDate: "19:53:22 - 19/05/2024",
    },
    {
      id: "4",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 20000,
      donationDate: "17:47:26 - 19/05/2024",
    },
    {
      id: "5",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 500000,
      donationDate: "16:06:30 - 19/05/2024",
    },
    {
      id: "6",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 100000,
      donationDate: "07:10:59 - 20/05/2024",
    },
    {
      id: "7",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 100000,
      donationDate: "07:10:59 - 20/05/2024",
    },
    {
      id: "8",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 50000,
      donationDate: "07:01:41 - 20/05/2024",
    },
    {
      id: "9",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 30000,
      donationDate: "23:59:16 - 19/05/2024",
    },
    {
      id: "10",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 100000,
      donationDate: "22:08:57 - 19/05/2024",
    },
    {
      id: "11",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 10000,
      donationDate: "11:54:37 - 20/05/2024",
    },
    {
      id: "12",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 20000,
      donationDate: "10:55:29 - 20/05/2024",
    },
    {
      id: "13",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 30000,
      donationDate: "09:24:05 - 20/05/2024",
    },
    {
      id: "14",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức XYZ",
      donationAmount: 60000,
      donationDate: "08:55:05 - 20/05/2024",
    },
    {
      id: "15",
      nameOfCampaign: "ĐÁNH CẮP MẶT TRỜI",
      organizeName: "Tổ chức ABC",
      donationAmount: 50000,
      donationDate: "08:44:54 - 20/05/2024",
    },
    // ... other data items ...
  ];
  
  return data.map((item, index) => ({
    ...item,
    numericalOrder: index + 1,
  }));
  
}
const ManageOrganizePhase3Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Quản lý giai đoạn sao kê • VMO</title>
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

export default ManageOrganizePhase3Table;
