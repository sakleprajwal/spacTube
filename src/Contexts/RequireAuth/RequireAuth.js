import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../authentication-context/auth-context";

export const RequireAuth = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    return isLoggedIn ? children : (<Navigate to="/login" state={{ from: location }} replace />);
}