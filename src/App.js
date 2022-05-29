import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Router from "./Router/Router";
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./Contexts/authentication-context/auth-context";
import Sidebar from "./Components/Sidebar/Sidebar";
import { VideosProvider } from "./Contexts/video-context/video-context";
import { ToastContainer } from "react-toastify";


function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((s) => !s);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar toggleSidebar={toggleSidebar} />
        <VideosProvider>
          <div className="flex-row">
            <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            <Router />
          </div>
        </VideosProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
