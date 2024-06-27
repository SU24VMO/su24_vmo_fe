import React from "react";
import TableMembers from "./TableMembers/TableMembers";
import { Helmet } from "react-helmet";

const ManageMembersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý người dùng xác thực • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Members</p>
      <TableMembers />
    </>
  );
};

export default ManageMembersPage;
