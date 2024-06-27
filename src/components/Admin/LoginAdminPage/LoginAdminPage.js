/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_src from "../../../assets/images/placeholder.svg";
import LoginForm from "./LoginAdminForm/LoginAdminForm";
import { Helmet } from "react-helmet";

const LoginAdminPage = () => {
  return (
    <>
    <Helmet>
      <title>Admin • VMO</title>
      <meta
        name="description"
        content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
      />
    </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginAdminPage;
