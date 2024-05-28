import "./App.css";
import Footer from "./components/Footer/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import {  BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ViewNewsPage from "./components/ViewsNewsPage/ViewNewsPage";
import Routing from "./routes/Routing";
// import SignUpVerifyOrganizePage from "./components/SignUpVerifyOrganizePage/SignUpVerifyOrganizePage";
// import SignUpVerifyUserPage from "./components/SignUpVerifyUserPage/SignUpVerifyUserPage";
// import ViewCampaignsPage from "./components/ViewCampaignsPage/ViewCampaignsPage";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <BrowserRouter>
        <NavigationBar />
        {/* <HomePage></HomePage> */}
        {/* <ViewNewsPage></ViewNewsPage> */}
        <Routing></Routing>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
