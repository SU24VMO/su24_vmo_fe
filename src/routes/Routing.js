import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import ViewCampaignsPage from "../components/ViewCampaignsPage/ViewCampaignsPage";
import LoginPage from "../components/LoginPage/LoginPage";
import NotFound from "./NotFound";
import NewsDetailPage from "../components/NewsDetailPage/NewsDetailPage";
import ViewNewsPage from "../components/ViewsNewsPage/ViewNewsPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import ResetPasswordPage from "../components/ResetPasswordPage/ResetPasswordPage";
export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/home" element={<HomePage></HomePage>} />
      <Route path="/viewCampaigns" element={<ViewCampaignsPage></ViewCampaignsPage>} />
      <Route path="/login" element={<LoginPage></LoginPage>} />
      <Route path="/signup" element={<SignUpPage></SignUpPage>} />
      <Route path="/resetPassword" element={<ResetPasswordPage></ResetPasswordPage>} />
      <Route path="/news" element={<ViewNewsPage></ViewNewsPage>}/>
      <Route path="/news/newsDetail" element={<NewsDetailPage></NewsDetailPage>} />

      <Route path="*" element={<NotFound></NotFound>} />

    </Routes>
  );
}
