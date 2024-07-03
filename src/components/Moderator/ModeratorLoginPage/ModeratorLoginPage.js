/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Helmet } from "react-helmet";
import ModeratorLoginForm from "./ModeratorLoginForm/ModeratorLoginForm";

const ModeratorLoginPage = () => {
  return (
    <>
     <Helmet>
      <title>Đăng nhập người kiểm duyệt • VMO</title>
      <meta
        name="description"
        content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
      />
    </Helmet>
    <ModeratorLoginForm/>
    </>
  );
};

export default ModeratorLoginPage;