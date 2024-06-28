/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import RequestManagerLoginForm from "./RequestManagerLoginForm/RequestManagerLoginForm";
import { Helmet } from "react-helmet";

const RequestManagerLoginPage = () => {
  return (
    <>
     <Helmet>
      <title>Đăng nhập người kiểm duyệt • VMO</title>
      <meta
        name="description"
        content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
      />
    </Helmet>
    <RequestManagerLoginForm/>
    </>
  );
};

export default RequestManagerLoginPage;