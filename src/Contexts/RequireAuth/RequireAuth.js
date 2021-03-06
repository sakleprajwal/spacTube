import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../authentication-context/auth-context";

export default function () {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}