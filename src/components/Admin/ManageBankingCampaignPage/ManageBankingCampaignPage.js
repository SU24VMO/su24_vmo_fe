import React from "react";
import { Helmet } from "react-helmet";
import TableBankingCampaignPage from "./TableBankingCampaignPage/TableBankingCampaignPage";

const ManageBankingCampaignPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý danh sách chiến dịch giao dịch • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lý danh sách chiến dịch giao dịch</p>
        <TableBankingCampaignPage/>
    </>
  );
};

export default ManageBankingCampaignPage;
