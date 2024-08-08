import React from "react";
import { Helmet } from "react-helmet";
import TableRequestStageActivities from "./TableRequestActivities/TableRequestStageActivities";

const ManageRequestStagesActivitiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "yêu cầu hoạt động" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Danh sách yêu cầu tạo hoạt động từng phần</p>
      <TableRequestStageActivities />
    </>
  );
};

export default ManageRequestStagesActivitiesPage;