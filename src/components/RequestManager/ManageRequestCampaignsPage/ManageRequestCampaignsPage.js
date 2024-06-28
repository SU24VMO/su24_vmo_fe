import React from "react";
import TableRequestCampaigns from "./TableRequestCampaigns/TableRequestCampaigns";
import { Helmet } from "react-helmet";

const ManageRequestCampaignsPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "yêu cầu tạo chiến dịch" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Request Campaigns Page</p>
      <TableRequestCampaigns />
    </>
  );
};

export default ManageRequestCampaignsPage;
