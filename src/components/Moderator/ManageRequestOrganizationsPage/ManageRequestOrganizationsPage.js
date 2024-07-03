import React from "react";
import TableRequestOrganizations from "./TableRequestOrganizations/TableRequestOrganizations";
import { Helmet } from "react-helmet";

const ManageRequestOrganizationsPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "yêu cầu tạo tổ chức" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Request Organizations Page</p>
      <TableRequestOrganizations />
    </>
  );
};

export default ManageRequestOrganizationsPage;
