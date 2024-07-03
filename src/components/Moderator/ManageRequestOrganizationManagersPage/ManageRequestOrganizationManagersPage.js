import React from "react";
import TableRequestOrganizationManagers from "./TableRequestOrganizationManagers/TableRequestOrganizationManagers";
import { Helmet } from "react-helmet";

const ManageRequestOrganizationManagersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "yêu cầu quản lý tổ chức" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Request Organization Managers Page</p>
      <TableRequestOrganizationManagers/>
    </>
  );
};

export default ManageRequestOrganizationManagersPage;
