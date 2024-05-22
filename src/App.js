import "./App.css";
import Footer from "./components/Footer/Footer";
// import HomePage from "./components/HomePage/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ViewCampaignDetailPage from "./components/ViewCampaignDetailPage/ViewCampaignDetailPage";
import NewsDetailPage from "./components/NewsDetailPage/NewsDetailPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import SignUpForm from "./components/SignUpPage/SignUpForm/SignUpForm";
import CreatNewsPage from "./components/CreateNewsPage/CreateNewsPage";
// import SignUpVerifyOrganizePage from "./components/SignUpVerifyOrganizePage/SignUpVerifyOrganizePage";
// import SignUpVerifyUserPage from "./components/SignUpVerifyUserPage/SignUpVerifyUserPage";
// import ViewCampaignsPage from "./components/ViewCampaignsPage/ViewCampaignsPage";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      {/* <HomePage /> */}
      {/* <ViewCampaignDetailPage/> */}
      {/* <SignUpPage /> */}
      {/* <SignUpForm /> */}
      {/* <ViewCampaignsPage /> */}
      {/* <EditProfilePage></EditProfilePage> */}
      {/* <SignUpVerifyUserPage></SignUpVerifyUserPage>
       */}
      {/* <NewsDetailPage></NewsDetailPage> */}
      {/* <SignUpVerifyOrganizePage></SignUpVerifyOrganizePage> */}
      <CreatNewsPage></CreatNewsPage>
      <Footer />
    </div>
  );
}

export default App;
