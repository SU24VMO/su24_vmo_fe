import React from "react";
import { Helmet } from "react-helmet";
import TableBankingCampaignPage from "./TableBankingTier2CampaignPage/TableBankingTier2CampaignPage";

const ManageBankingTier2CampaignPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý danh sách sao kê giao dịch từng phần • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lý danh sách sao kê giao dịch từng phần</p>
      <TableBankingCampaignPage />
    </>
  );
};

export default ManageBankingTier2CampaignPage;
