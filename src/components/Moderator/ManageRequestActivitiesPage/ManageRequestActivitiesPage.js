import React from "react";
import TableRequestActivities from "./TableRequestActivities/TableRequestActivities";
import { Helmet } from "react-helmet";

const ManageRequestActivitiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "yêu cầu hoạt động" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Request Activities Page</p>
      <TableRequestActivities />
    </>
  );
};

export default ManageRequestActivitiesPage;