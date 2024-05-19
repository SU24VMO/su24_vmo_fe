import "./App.css";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <div className="w-full flex min-h-screen max-w-screen-desktop flex-col">
      <NavigationBar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
