import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../features/auth/utils/authStorage";

export default function AuthRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
