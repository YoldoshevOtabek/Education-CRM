import { Navigate, Outlet } from "react-router-dom";
import useMe from "../features/auth/hooks/useMe";
import Spinner from "../components/ui/Spinner";
import { isAuthenticated } from "../features/auth/utils/authStorage";

export default function ProtectedRoute() {
  const authenticated = isAuthenticated();
  const { isLoading } = useMe();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Spinner fullscreen tip="Yuklanmoqda..." />;
  }

  return <Outlet />;
}
