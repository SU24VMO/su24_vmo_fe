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
import CreateCampaignPage from "../components/CreateCampaignPage/CreateCampaignPage";
import ViewProfilePage from "../components/ViewProfilePage/ViewProfilePage";


import SignUpPage from "../components/SignUpPage/SignUpPage";
import ResetPasswordPage from "../components/ResetPasswordPage/ResetPasswordPage";
import CreateActivityPage from "../components/CreateActivityPage/CreateActivityPage";
import EditProfilePage from "../components/EditProfilePage/EditProfilePage";
import CreatNewsPage from "../components/CreateNewsPage/CreateNewsPage";
import SignUpVerifyUserPage from "../components/SignUpVerifyUserPage/SignUpVerifyUserPage";
import SignUpVerifyOrganizePage from "../components/SignUpVerifyOrganizePage/SignUpVerifyOrganizePage";
import ManageOrganizeAllCampaignsTable from "../components/OrganizeManagePage/ManageOrganizeAllCampaignsTable/ManageOrganizeAllCampaignsTable";
import ManageOrganizePhase1Table from "../components/OrganizeManagePage/ManageOrganizePhase1Table/ManageOrganizePhase1Table";
import ManageOrganizePhase2Table from "../components/OrganizeManagePage/ManageOrganizePhase2Table/ManageOrganizePhase2Table";
import ManageOrganizePhase3Table from "../components/OrganizeManagePage/ManageOrganizePhase3Table/ManageOrganizePhase3Table";
import ManageOrganizeAllActivitiesTable from "../components/OrganizeManagePage/ManageOrganizeAllActivitiesTable/ManageOrganizeAllActivitiesTable";
import ManageOrganizeOrganizationsTable from "../components/OrganizeManagePage/ManageOrganizeOrganizationsTable/ManageOrganizeOrganizationsTable";
import ManageOrganizeNewsTable from "../components/OrganizeManagePage/ManageOrganizeNewsTable/ManageOrganizeNewsTable";
import RequestManager from "../components/RequestManager/RequestManager";
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
      <Route path="/createNews" element={<CreatNewsPage></CreatNewsPage>}/>
      <Route path="/viewProfile" element={<ViewProfilePage></ViewProfilePage>} />
      <Route path="/editProfile" element={<EditProfilePage></EditProfilePage>} />
      <Route path="/sigupVerifyUserForm" element={<SignUpVerifyUserPage></SignUpVerifyUserPage>} />
      
      <Route path="/sigupVerifyOrganizeForm" element={<SignUpVerifyOrganizePage></SignUpVerifyOrganizePage>} />


        <Route path="/news/newsDetail" element={<NewsDetailPage></NewsDetailPage>} />
        <Route path="/createCampaign" element={<CreateCampaignPage></CreateCampaignPage>} />
        <Route path="/createActivity" element={<CreateActivityPage></CreateActivityPage>} />


      <Route path="*" element={<NotFound></NotFound>} />
      <Route path="/manage/allCampaigns" element={<ManageAllCampaignsTable />} />
      <Route path="/manage/allPhase1" element={<ManagePhase1Table></ManagePhase1Table>} />
      <Route path="/manage/allPhase2" element={<ManagePhase2Table></ManagePhase2Table>} />
      <Route path="/manage/allPhase3" element={<ManagePhase3Table></ManagePhase3Table>} />
      <Route path="/manage/allActivities" element={<ManageAllActivitiesTable/>} />
      
      {/* Organize manager */}
      <Route path="/manage/organize/allOrganizations" element={<ManageOrganizeOrganizationsTable/>}/>
      <Route path="/manage/organize/allCampaigns" element={<ManageOrganizeAllCampaignsTable></ManageOrganizeAllCampaignsTable>}/>
      <Route path="/manage/organize/allNews" element={<ManageOrganizeNewsTable></ManageOrganizeNewsTable>}/>
      <Route path="/manage/organize/allPhase1" element={<ManageOrganizePhase1Table></ManageOrganizePhase1Table>} />
      <Route path="/manage/organize/allPhase2" element={<ManageOrganizePhase2Table></ManageOrganizePhase2Table>} />
      <Route path="/manage/organize/allPhase3" element={<ManageOrganizePhase3Table></ManageOrganizePhase3Table>} />
      <Route path="/manage/organize/allActivities" element={<ManageOrganizeAllActivitiesTable/>} />
      

      <Route path="/requestManager" element={<RequestManager/>} />





    </Routes>
  );
}
