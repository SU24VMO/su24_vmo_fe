import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import ViewCampaignsPage from "../components/ViewCampaignsPage/ViewCampaignsPage";
import LoginPage from "../components/LoginPage/LoginPage";
import NotFound from "./NotFound";
import NewsDetailPage from "../components/NewsDetailPage/NewsDetailPage";
import ViewNewsPage from "../components/ViewsNewsPage/ViewNewsPage";
import ManageAllCampaignsTable from "../components/MemberManagePage/ManageAllCampaignsTable/ManageAllCampaignsTable";
import ManagePhase1Table from "../components/MemberManagePage/ManagePhase1Table/ManagePhase1Table";
import ManagePhase2Table from "../components/MemberManagePage/ManagePhase2Table/ManagePhase2Table";
import ManagePhase3Table from "../components/MemberManagePage/ManagePhase3Table/ManagePhase3Table";
import ManageAllActivitiesTable from "../components/MemberManagePage/ManageAllActivitiesTable/ManageAllActivitiesTable";


export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/home" element={<HomePage></HomePage>} />
      <Route path="/viewCampaigns" element={<ViewCampaignsPage></ViewCampaignsPage>} />
      <Route path="/login" element={<LoginPage></LoginPage>} />
      <Route path="/news" element={<ViewNewsPage></ViewNewsPage>}>

      </Route>
        <Route path="/news/newsDetail" element={<NewsDetailPage></NewsDetailPage>} />

      <Route path="*" element={<NotFound></NotFound>} />
      <Route path="/manage/allCampaigns" element={<ManageAllCampaignsTable />} />
      <Route path="/manage/allPhase1" element={<ManagePhase1Table></ManagePhase1Table>} />
      <Route path="/manage/allPhase2" element={<ManagePhase2Table></ManagePhase2Table>} />
      <Route path="/manage/allPhase3" element={<ManagePhase3Table></ManagePhase3Table>} />
      <Route path="/manage/allActivities" element={<ManageAllActivitiesTable/>} />




    </Routes>
  );
}
