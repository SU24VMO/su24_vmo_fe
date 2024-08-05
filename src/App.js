import "./App.css";
import React, { useState } from "react";
import Footer from "./components/Footer/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Toaster } from "./components/ui/toaster";
import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ViewCampaignsPage from "./components/ViewCampaignsPage/ViewCampaignsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NotFound from "./routes/NotFound";
import NewsDetailPage from "./components/NewsDetailPage/NewsDetailPage";
import ViewNewsPage from "./components/ViewsNewsPage/ViewNewsPage";

import ViewProfilePage from "./components/ViewProfilePage/ViewProfilePage";


import SignUpPage from "./components/SignUpPage/SignUpPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import CreatNewsPage from "./components/CreateNewsPage/CreateNewsPage";
import SignUpVerifyUserPage from "./components/SignUpVerifyUserPage/SignUpVerifyUserPage";
import SignUpVerifyOrganizePage from "./components/SignUpVerifyOrganizePage/SignUpVerifyOrganizePage";
import ManageOrganizeAllCampaignsTable from "./components/OrganizeManagePage/ManageOrganizeAllCampaignsTable/ManageOrganizeAllCampaignsTable";
import ManageOrganizePhase1Table from "./components/OrganizeManagePage/ManageOrganizePhase1Table/ManageOrganizePhase1Table";
import ManageOrganizePhase2Table from "./components/OrganizeManagePage/ManageOrganizePhase2Table/ManageOrganizePhase2Table";
import ManageOrganizePhase3Table from "./components/OrganizeManagePage/ManageOrganizePhase3Table/ManageOrganizePhase3Table";
import ManageOrganizeAllActivitiesTable from "./components/OrganizeManagePage/ManageOrganizeAllActivitiesTable/ManageOrganizeAllActivitiesTable";
import ManageOrganizeOrganizationsTable from "./components/OrganizeManagePage/ManageOrganizeOrganizationsTable/ManageOrganizeOrganizationsTable";
import ManageOrganizeNewsTable from "./components/OrganizeManagePage/ManageOrganizeNewsTable/ManageOrganizeNewsTable";
import CreateOrganizePage from "./components/CreateOrganizePage/CreateOrganizePage";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import ShowNavBarFooter from "./components/ShowNavBarFooter/ShowNavBarFooter";
import ChangePassswordPage from "./components/ChangePassswordPage/ChangePassswordPage";
import LoginAdminPage from "./components/Admin/LoginAdminPage/LoginAdminPage";
import AdminHomePage from "./components/Admin/AdminHomePage/AdminHomePage";
import Admin from "./components/Admin/Admin";
import ManageOrganizationManagersPage from "./components/Admin/ManageOrganizationManagersPage/ManageOrganizationManagersPage";

import UnauthorizedPage from "./components/UnauthorizedPage/UnauthorizedPage";
import { Helmet } from "react-helmet";
import CreateActivityOrganizationManagerPage from "./components/CreateActivityOrganizationManagerPage/CreateActivityOrganizationManagerPage";
import ViewCampaignDetailPage from "./components/ViewCampaignDetailPage/ViewCampaignDetailPage";
import DonatePage from "./components/DonatePage/DonatePage";
import Moderator from "./components/Moderator/Moderator";
import ModeratorHomePage from "./components/Moderator/ModeratorHomePage/ModeratorHomePage";
import ManageRequestActivitiesPage from "./components/Moderator/ManageRequestActivitiesPage/ManageRequestActivitiesPage";
import ManageRequestOrganizationsPage from "./components/Moderator/ManageRequestOrganizationsPage/ManageRequestOrganizationsPage";
import ManageRequestOrganizationManagersPage from "./components/Moderator/ManageRequestOrganizationManagersPage/ManageRequestOrganizationManagersPage";

import ManageRequestNewsPage from "./components/Moderator/ManageRequestNewsPage/ManageRequestNewsPage";
import ManageRequestCampaignsPage from "./components/Moderator/ManageRequestCampaignsPage/ManageRequestCampaignsPage";
import ModeratorLoginPage from "./components/Moderator/ModeratorLoginPage/ModeratorLoginPage";
import ManageModeratorsPage from "./components/Admin/ManageModeratorsPage/ManageModeratorsPage";
import ManageVolunteerPage from "./components/Admin/ManageVolunteersPage/ManageVolunteerPage";
import ManageMembersPage from "./components/Admin/ManageMembersPage/ManageMembersPage";
import ManageRequestVolunteersPage from "./components/Moderator/ManageRequestVolunteersPage/ManageRequestVolunteersPage";
import ViewCampaignsOrganizationsPage from "./components/ViewCampaignsOrganizationsPage/ViewCampaignsOrganizationsPage";
import ViewCampaignsVolunteersPage from "./components/ViewCampaignsVolunteersPage/ViewCampaignsVolunteersPage";
import ViewCampaignsSearchPage from "./components/ViewCampaignsSearchPage/ViewCampaignsSearchPage";
import IntroductionPage from "./components/IntroductionPage/IntroductionPage";
import ManageVolunteerAllActivitiesTable from "./components/VolunteerManagePage/ManageVolunteerAllActivitiesTable/ManageVolunteerAllActivitiesTable";
import ManageVolunteerAllCampaignsTable from "./components/VolunteerManagePage/ManageVolunteerAllCampaignsTable/ManageVolunteerAllCampaignsTable";
import ManageVolunteerNewsTable from "./components/VolunteerManagePage/ManageVolunteerNewsTable/ManageVolunteerNewsTable";
import ManageVolunteerPhase1Table from "./components/VolunteerManagePage/ManageVolunteerPhase1Table/ManageVolunteerPhase1Table";
import ManageVolunteerPhase2Table from "./components/VolunteerManagePage/ManageVolunteerPhase2Table/ManageVolunteerPhase2Table";
import ManageVolunteerPhase3Table from "./components/VolunteerManagePage/ManageVolunteerPhase3Table/ManageVolunteerPhase3Table";
import CreateCampaignVolunteerPage from "./components/CreateCampaignVolunteerPage/CreateCampaignVolunteerPage";
import CreateCampaignOrganizationManagerPage from "./components/CreateCampaignOrganizationManagerPage/CreateCampaignOrganizationManagerPage";
import ViewProfileVolunteerPage from "./components/ViewProfileVolunteerPage/ViewProfileVolunteerPage";
import CreateActivityVolunteerPage from "./components/CreateActivityVolunteerPage/CreateActivityVolunteerPage";
import ViewProfileOrganizationPage from "./components/ViewProfileOrganizationPage/ViewProfileOrganizationPage";
import TermsPage from "./components/TermsPage/TermsPage";
import UpdateCampaignOrganizationManagerPage from "./components/UpdateCampaignOrganizationManagerPage/UpdateCampaignOrganizationManagerPage";
import UpdateNewsPage from "./components/UpdateNewsPage/UpdateNewsPage";
import UpdateActivityOrganizationManagerPage from "./components/UpdateActivityOrganizationManagerPage/UpdateActivityOrganizationManagerPage";
import UpdateOrganizationPage from "./components/UpdateOrganizationPage/UpdateOrganizationPage";
import UpdateCampaignVolunteerPage from "./components/UpdateCampaignVolunteerPage/UpdateCampaignVolunteerPage";
import UpdateActivityVolunteerPage from "./components/UpdateActivityVolunteerPage/UpdateActivityVolunteerPage";
import ManageBankingCampaignPage from "./components/Admin/ManageBankingCampaignPage/ManageBankingCampaignPage";
import ManageTransactionPage from "./components/Admin/ManageTransactionPage/ManageTransactionPage";
import { LocationProvider } from "./context/LocationContext";


function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <BrowserRouter>
        <Helmet>
          <title>VMO • App Thiện Nguyện</title>
          <meta name="description" content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn" />
          <meta name="keywords" content="VMO, tình nguyện, mô hình, giúp đỡ" />
        </Helmet>
        <LocationProvider>
        <AuthProvider>
          <ShowNavBarFooter>
            {/* cái ShowNavBarFooter có tác dụng ngăn render ở những trang không mong muốn như Login, Signup v....v */}
            <NavigationBar />
          </ShowNavBarFooter>
          <Routes>
            {/* Guest */}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/loginAdminVMO" element={<LoginAdminPage />} />
            <Route path="/loginModeratorVMO" element={<ModeratorLoginPage />} />
            <Route path="/introduction" element={<IntroductionPage />} />
            <Route path="/terms" element={<TermsPage></TermsPage>} />



            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/home" element={<HomePage></HomePage>} />
            <Route path="/viewCampaigns" element={<ViewCampaignsPage></ViewCampaignsPage>} />
            <Route path="/viewCampaigns/search/:id" element={<ViewCampaignsSearchPage key={window.location.pathname}></ViewCampaignsSearchPage>} />
            <Route path="/viewCampaignsOrganizations" element={<ViewCampaignsOrganizationsPage></ViewCampaignsOrganizationsPage>} />
            <Route path="/viewCampaignsVolunteers" element={<ViewCampaignsVolunteersPage></ViewCampaignsVolunteersPage>} />
            <Route path="/viewCampaigns/campaignDetail/:id" element={<ViewCampaignDetailPage key={window.location.pathname}></ViewCampaignDetailPage>} />
            <Route path="/volunteer/:id" element={<ViewProfileVolunteerPage></ViewProfileVolunteerPage>} />
            <Route path="/organization/:id" element={<ViewProfileOrganizationPage></ViewProfileOrganizationPage>} />
            <Route path="/signup" element={<SignUpPage></SignUpPage>} />
            <Route path="/resetPassword" element={<ResetPasswordPage></ResetPasswordPage>} />
            <Route path="/news" element={<ViewNewsPage></ViewNewsPage>} />
            <Route path="/news/newsDetail/:id" element={<NewsDetailPage></NewsDetailPage>} />
            <Route path="/unauthorized" element={<UnauthorizedPage></UnauthorizedPage>} />

            {/* All role isLogin */}
            <Route element={<PrivateRoute allowedRoles={["Member", "Volunteer", "OrganizationManager", "Moderator"]} requireVerification={false} />}>
              {/* <Route path="/resetPassword" element={<ResetPasswordPage></ResetPasswordPage>} /> */}
              <Route path="/viewProfile" element={<ViewProfilePage></ViewProfilePage>} />
              <Route path="/changePassword" element={<ChangePassswordPage></ChangePassswordPage>} />
              <Route path="/editProfile" element={<EditProfilePage></EditProfilePage>} />
              <Route path="/donate/:campaignID" element={<DonatePage />} />
              <Route path="/createNews" element={<CreatNewsPage></CreatNewsPage>} />
              <Route path="/updateNews/:id" element={<UpdateNewsPage/>} />

            </Route>

            {/* Organize && Volunteer role  */}
            {/* <Route element={<PrivateRoute allowedRoles={["OrganizationManager", "Volunteer"]} />}>
            </Route> */}

            {/* Only Volunteer */}
            <Route element={<PrivateRoute allowedRoles={["Volunteer"]} />}>

              {/* Volunteer manager */}
              <Route path="/manage/volunteer/allCampaigns" element={<ManageVolunteerAllCampaignsTable />} />
              <Route path="/manage/volunteer/allNews" element={<ManageVolunteerNewsTable />} />
              <Route path="/manage/volunteer/allPhase1" element={<ManageVolunteerPhase1Table />} />
              <Route path="/manage/volunteer/allPhase2" element={<ManageVolunteerPhase2Table />} />
              <Route path="/manage/volunteer/allPhase3" element={<ManageVolunteerPhase3Table />} />
              <Route path="/manage/volunteer/allActivities" element={<ManageVolunteerAllActivitiesTable />} />
              <Route path="/createActivityVolunteer" element={<CreateActivityVolunteerPage />} />
              <Route path="/createCampaignVolunteer" element={<CreateCampaignVolunteerPage />} />
              <Route path="/updateCampaignVolunteer/:id" element={<UpdateCampaignVolunteerPage />} />
              <Route path="/updateActivityVolunteer/:id" element={<UpdateActivityVolunteerPage />} />


            </Route>

            <Route element={<PrivateRoute allowedRoles={["OrganizationManager"]} />}>

              {/* Only Organize manager */}
              <Route path="/manage/organize/allOrganizations" element={<ManageOrganizeOrganizationsTable />} />
              <Route path="/manage/organize/allCampaigns" element={<ManageOrganizeAllCampaignsTable></ManageOrganizeAllCampaignsTable>} />
              <Route path="/manage/organize/allNews" element={<ManageOrganizeNewsTable></ManageOrganizeNewsTable>} />
              <Route path="/manage/organize/allPhase1" element={<ManageOrganizePhase1Table></ManageOrganizePhase1Table>} />
              <Route path="/manage/organize/allPhase2" element={<ManageOrganizePhase2Table></ManageOrganizePhase2Table>} />
              <Route path="/manage/organize/allPhase3" element={<ManageOrganizePhase3Table></ManageOrganizePhase3Table>} />
              <Route path="/manage/organize/allActivities" element={<ManageOrganizeAllActivitiesTable />} />
              <Route path="/createOrganization" element={<CreateOrganizePage />} />
              {/* <Route path="/createVerifyOrganizationManager" element={<SignUpVerifyOrganizePage />} /> */}
              <Route path="/createActivityOM" element={<CreateActivityOrganizationManagerPage />} />
              <Route path="/createCampaignOrganizationManager" element={<CreateCampaignOrganizationManagerPage />} />
              <Route path="/updateCampaignOrganizationManager/:id" element={<UpdateCampaignOrganizationManagerPage />} />
              <Route path="/updateActivityOrganizationManager/:id" element={<UpdateActivityOrganizationManagerPage />} />
              <Route path="/updateOrganization/:id" element={<UpdateOrganizationPage/>} />




            </Route>




            <Route element={<PrivateRoute allowedRoles={["OrganizationManager"]} requireVerification={false} />}>

              {/* Only Organize manager */}
              <Route path="/createVerifyOrganizationManager" element={<SignUpVerifyOrganizePage />} />


            </Route>


            <Route element={<PrivateRoute allowedRoles={["Member"]} requireVerification={false} />}>

              {/* Only Volunteer */}
              <Route path="/createVerifyVolunteer" element={<SignUpVerifyUserPage></SignUpVerifyUserPage>} />



            </Route>



            {/* Other routes */}


            <Route element={<PrivateRoute allowedRoles={["Admin"]} requireVerification={false} />}>
              <Route path="/admin" element={<Admin />}>
                <Route index element={<AdminHomePage />} />
                <Route path="manageVolunteers" element={<ManageVolunteerPage />} />
                <Route path="manageOrganizationManagers" element={<ManageOrganizationManagersPage />} />
                <Route path="manageModerators" element={<ManageModeratorsPage />} />
                <Route path="manageMembers" element={<ManageMembersPage />} />
                <Route path="manageBanking" element={<ManageBankingCampaignPage />} />
                <Route path="manageTransaction" element={<ManageTransactionPage />} />
              </Route>
            </Route>

            <Route element={<PrivateRoute allowedRoles={["Moderator"]} />}>
              <Route path="/moderator" element={<Moderator />}>
                <Route index element={<ModeratorHomePage />} />
                <Route path="manageRequestActivities" element={<ManageRequestActivitiesPage />} />
                <Route path="manageRequestOrganizations" element={<ManageRequestOrganizationsPage />} />
                <Route path="manageRequestOrganizationManagers" element={<ManageRequestOrganizationManagersPage />} />
                <Route path="manageRequestVolunteers" element={<ManageRequestVolunteersPage />} />
                <Route path="manageRequestNews" element={<ManageRequestNewsPage />} />
                <Route path="manageRequestCampaigns" element={<ManageRequestCampaignsPage />} />
              </Route>
            </Route>


            <Route path="*" element={<NotFound></NotFound>} />
          </Routes>
            <Footer />
          <Toaster />
        </AuthProvider>
        </LocationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
