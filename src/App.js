import "./App.css";
// import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import Footer from "./components/Footer/Footer";
// import HomePage from "./components/HomePage/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ViewCampaignDetailPage from "./components/ViewCampaignDetailPage/ViewCampaignDetailPage";
import NewsDetailPage from "./components/NewsDetailPage/NewsDetailPage";
// import SignUpVerifyOrganizePage from "./components/SignUpVerifyOrganizePage/SignUpVerifyOrganizePage";
// import SignUpVerifyUserPage from "./components/SignUpVerifyUserPage/SignUpVerifyUserPage";
// import ViewCampaignsPage from "./components/ViewCampaignsPage/ViewCampaignsPage";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      {/* <HomePage /> */}
      <ViewCampaignDetailPage/>
      {/* <ViewCampaignsPage /> */}
      {/* <EditProfilePage></EditProfilePage> */}
      {/* <SignUpVerifyUserPage></SignUpVerifyUserPage>
       */}
      {/* <NewsDetailPage></NewsDetailPage> */}
       {/* <SignUpVerifyOrganizePage></SignUpVerifyOrganizePage> */}
      <Footer />
    </div>
  );
}

export default App;
