import "./App.css";
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import Footer from "./components/Footer/Footer";
// import HomePage from "./components/HomePage/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// import ViewCampaignsPage from "./components/ViewCampaignsPage/ViewCampaignsPage";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      {/* <HomePage /> */}
      {/* <ViewCampaignsPage /> */}
      <EditProfilePage></EditProfilePage>
      <Footer />
    </div>
  );
}

export default App;
