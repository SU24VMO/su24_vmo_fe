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
import ManageAllCampaignsTable from "./components/MemberManagePage/ManageAllCampaignsTable/ManageAllCampaignsTable";
import ManagePhase1Table from "./components/MemberManagePage/ManagePhase1Table/ManagePhase1Table";
import ManagePhase2Table from "./components/MemberManagePage/ManagePhase2Table/ManagePhase2Table";
import ManagePhase3Table from "./components/MemberManagePage/ManagePhase3Table/ManagePhase3Table";
import ManageAllActivitiesTable from "./components/MemberManagePage/ManageAllActivitiesTable/ManageAllActivitiesTable";
import CreateCampaignPage from "./components/CreateCampaignPage/CreateCampaignPage";
import ViewProfilePage from "./components/ViewProfilePage/ViewProfilePage";


import SignUpPage from "./components/SignUpPage/SignUpPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import CreateActivityPage from "./components/CreateActivityPage/CreateActivityPage";
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
import Loading from "./components/Loading/Loading";
import ChangePassswordPage from "./components/ChangePassswordPage/ChangePassswordPage";
import LoginAdminPage from "./components/Admin/LoginAdminPage/LoginAdminPage";
import AdminHomePage from "./components/Admin/AdminHomePage/AdminHomePage";
import Admin from "./components/Admin/Admin";
import ManageMembersPage from "./components/Admin/ManageMembersPage/ManageMembersPage";
import ManageOrganizationManagers from "./components/Admin/ManageOrganizationManagersPage/ManageOrganizationManagersPage";
import ManageOrganizationManagersPage from "./components/Admin/ManageOrganizationManagersPage/ManageOrganizationManagersPage";
import ManageRequestManagersPage from "./components/Admin/ManageRequestManagersPage/ManageRequestManagersPage";
import ManageUsersPage from "./components/Admin/ManageUsersPage/ManageUsersPage";


function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <BrowserRouter>
        <AuthProvider>
          <ShowNavBarFooter>
            {/* cái ShowNavBarFooter có tác dụng ngăn render ở những trang không mong muốn như Login, Signup v....v */}
            <NavigationBar />
          </ShowNavBarFooter>
          <Routes>
            {/* Guest */}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/loginAdminVMO" element={<LoginAdminPage />} />
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/home" element={<HomePage></HomePage>} />
            <Route path="/viewCampaigns" element={<ViewCampaignsPage></ViewCampaignsPage>} />
            <Route path="/signup" element={<SignUpPage></SignUpPage>} />
            <Route path="/resetPassword" element={<ResetPasswordPage></ResetPasswordPage>} />
            <Route path="/news" element={<ViewNewsPage></ViewNewsPage>} />
            <Route path="/news/newsDetail" element={<NewsDetailPage></NewsDetailPage>} />

            {/* All role isLogin */}
            <Route element={<PrivateRoute allowedRoles={["User", "OrganizationManager", "Member"]} />}>
              <Route path="/resetPassword" element={<ResetPasswordPage></ResetPasswordPage>} />
              <Route path="/viewProfile" element={<ViewProfilePage></ViewProfilePage>} />
              <Route path="/changePassword" element={<ChangePassswordPage></ChangePassswordPage>} />
              <Route path="/editProfile" element={<EditProfilePage></EditProfilePage>} />
              <Route path="/createCampaign" element={<CreateCampaignPage/>} />

            </Route>

            {/* Organize && Member role  */}
            <Route element={<PrivateRoute allowedRoles={["OrganizationManager", "Member"]} />}>
              <Route path="/createActivity" element={<CreateActivityPage></CreateActivityPage>} />
            </Route>

            {/* Only Member */}
            <Route element={<PrivateRoute allowedRoles={["Member"]} />}>

              {/* Member manager */}
              <Route path="/manage/allCampaigns" element={<ManageAllCampaignsTable />} />
              <Route path="/manage/allPhase1" element={<ManagePhase1Table></ManagePhase1Table>} />
              <Route path="/manage/allPhase2" element={<ManagePhase2Table></ManagePhase2Table>} />
              <Route path="/manage/allPhase3" element={<ManagePhase3Table></ManagePhase3Table>} />
              <Route path="/manage/allActivities" element={<ManageAllActivitiesTable />} />
              <Route path="/sigupVerifyUserForm" element={<SignUpVerifyUserPage></SignUpVerifyUserPage>} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["OrganizationManager"]} />}>

              {/* Only Organize manager */}
              <Route path="/createNews" element={<CreatNewsPage></CreatNewsPage>} />
              <Route path="/createOrganizeForm" element={<CreateOrganizePage></CreateOrganizePage>} />
              <Route path="/manage/organize/allOrganizations" element={<ManageOrganizeOrganizationsTable />} />
              <Route path="/manage/organize/allCampaigns" element={<ManageOrganizeAllCampaignsTable></ManageOrganizeAllCampaignsTable>} />
              <Route path="/manage/organize/allNews" element={<ManageOrganizeNewsTable></ManageOrganizeNewsTable>} />
              <Route path="/manage/organize/allPhase1" element={<ManageOrganizePhase1Table></ManageOrganizePhase1Table>} />
              <Route path="/manage/organize/allPhase2" element={<ManageOrganizePhase2Table></ManageOrganizePhase2Table>} />
              <Route path="/manage/organize/allPhase3" element={<ManageOrganizePhase3Table></ManageOrganizePhase3Table>} />
              <Route path="/manage/organize/allActivities" element={<ManageOrganizeAllActivitiesTable />} />
              <Route path="/sigupVerifyOrganizeForm" element={<SignUpVerifyOrganizePage></SignUpVerifyOrganizePage>} />
              <Route path="/createOrganization" element={<CreateOrganizePage/>}/>
              <Route path="/createVerifyOrganizationManager" element={<SignUpVerifyOrganizePage/>}/>


            </Route>
            {/* Other routes */}


            <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin" element={<Admin />}>
                <Route index element={<AdminHomePage />} />
                <Route path="manageMembers" element={<ManageMembersPage />} />
                <Route path="manageOrganizationManagers" element={<ManageOrganizationManagersPage />} />
                <Route path="manageRequestManagers" element={<ManageRequestManagersPage />} />
                <Route path="manageUsers" element={<ManageUsersPage />} />
              </Route>
            </Route>


            <Route path="*" element={<NotFound></NotFound>} />
          </Routes>
          <ShowNavBarFooter>
            <Footer />
          </ShowNavBarFooter>
          <Toaster />
        </AuthProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
