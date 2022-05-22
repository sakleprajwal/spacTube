import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Router from "./Router/Router";
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./Contexts/authentication-context/auth-context";
import Sidebar from "./Components/Sidebar/Sidebar";


function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((s) => !s);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-row">
          <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
          <Router />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
