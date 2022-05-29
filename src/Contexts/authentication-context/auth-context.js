import { useContext, useState, createContext } from "react";
import Toaster from "../../Components/Toaster/Toaster";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const userToken  = localStorage.getItem("spacTube-token");

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (loginForm, path) => {
        try {
            const res = await axios.post("api/auth/login", loginForm);
            if (res.status === 200) {
              localStorage.setItem("spacTube-token", res?.data?.encodedToken)
              setIsLoggedIn(true);
            }
            Toaster({ message: "You have successsfully logged in", type: "success" });
            navigate(path, { replace: true });
        } catch (e) {
          Toaster({
            message: "Invalid credentials. Please try again.",
            type: "error",
          });
        }
      };

      const handleLogout = async () => {
        try {
          localStorage.removeItem("spacTube-token");
          setIsLoggedIn(false);
          Toaster({ message: "Logout successful!!", type: "success" });
        } catch (e) {
          Toaster({  message: "Could not log you out. Please try again.", type: "error", });
        }
      };
    
      const handleSignup = async (signupForm, path) => {
        try {
          const { status, data } = await axios.post("/api/auth/signup", signupForm);
          if (status === 201) {
            localStorage.setItem("spacTube-token", data.encodedToken);
            setIsLoggedIn(true);
            Toaster({ message: "Welcome!! You have successsfully signed up.", type: "success" });
            navigate(path, { replace: true });
          }
        } catch (e) {
          Toaster({ message: "There was an issue in signup. Please try again", type: "error" });
        }
      };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            handleLogin,
            handleSignup,
            handleLogout,
            }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}