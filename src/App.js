import "./App.css";
// import Footer from "./components/Footer/Footer";
// import NavigationBar from "./components/NavigationBar/NavigationBar";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
// import Routing from "./routes/Routing";
import Admin from "./components/Admin/Admin";


function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <BrowserRouter>
        {/* <NavigationBar />
        <Routing></Routing>
        <Footer /> */}
        <Admin/>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
