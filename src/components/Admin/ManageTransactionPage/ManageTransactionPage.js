import React from "react";
import { Helmet } from "react-helmet";
import TableTransactionUserCampaignPage from "../ManageTransactionPage/TableTransactionUserCampaignPage/TableTransactionUserCampaignPage";
import TableTransactionAdminCampaignPage from "./TableTransactionAdminCampaignPage/TableTransactionAdminCampaignPage";

const ManageTransactionPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý danh sách giao dịch • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lý danh sách giao dịch người dùng</p>
      <TableTransactionUserCampaignPage />
      <p className="font-bold text-2xl">Quản lý danh sách giao dịch quản lý hệ thống</p>
      <TableTransactionAdminCampaignPage/>

    </>
  );
};

export default ManageTransactionPage;
