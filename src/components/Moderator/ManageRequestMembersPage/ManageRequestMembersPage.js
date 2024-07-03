import React from "react";
import TableRequestMembers from "./TableRequestMembers/TableRequestMembers";
import { Helmet } from "react-helmet";


const ManageRequestMembersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "người dùng xác thực" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Request Members Page</p>
    <TableRequestMembers/>
    </>
  );
};

export default ManageRequestMembersPage;
