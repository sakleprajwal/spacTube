import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authentication-context/auth-context";

export default function () {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Navigate to="/" state={{ from: location }} replace={true} />
  ) : (
    <Outlet />
  );
}