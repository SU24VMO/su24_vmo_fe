import "./App.css";
import CreateCampaignPage from "./components/CreateCampaignPage/CreateCampaignPage";
// import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import Footer from "./components/Footer/Footer";
// import HomePage from "./components/HomePage/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";


function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      {/* <HomePage /> */}
 
       <CreateCampaignPage></CreateCampaignPage>
      <Footer />
    </div>
  );
}

export default App;
