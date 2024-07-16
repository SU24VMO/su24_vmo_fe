import React from "react";
import TableOrganizationManagers from "./TableOrganizationManagers/TableOrganizationManagers";
import { Helmet } from "react-helmet";

const ManageOrganizationManagersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý tài khoản tổ chức • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lý tài khoản tổ chức</p>
      <TableOrganizationManagers/>
    </>
  );
};

export default ManageOrganizationManagersPage;
