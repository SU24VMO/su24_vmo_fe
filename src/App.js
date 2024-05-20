import "./App.css";
import Footer from "./components/Footer/Footer";
// import HomePage from "./components/HomePage/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ViewCampaignDetailPage from "./components/ViewCampaignDetailPage/ViewCampaignDetailPage";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      {/* <HomePage /> */}
      <ViewCampaignDetailPage/>
      <Footer />
    </div>
  );
}

export default App;
