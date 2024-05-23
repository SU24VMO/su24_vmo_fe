import "./App.css";
import DonatePage from "./components/DonatePage/DonatePage";
import Footer from "./components/Footer/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      <DonatePage />
      <Footer />
    </div>
  );
}

export default App;
