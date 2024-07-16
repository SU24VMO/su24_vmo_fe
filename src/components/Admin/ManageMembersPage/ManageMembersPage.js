import React from "react";
import { Helmet } from "react-helmet";
import TableMembers from "./TableMembers/TableMembers";

const ManageMembersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý tài khoản thành viên • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lý tài khoản thành viên </p>
      <TableMembers />
    </>
  );
};

export default ManageMembersPage;
