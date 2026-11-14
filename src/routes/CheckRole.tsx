import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import type { USER_ROLE } from "../features/auth/types/auth";

type CheckRoleProps = {
  roles: USER_ROLE[];
  children: ReactNode;
};

export default function CheckRole({ roles, children }: CheckRoleProps) {
  const { role } = useUser();
  console.log("Current path:", window.location.pathname);
  console.log("User role:", role);
  console.log("Allowed roles:", roles);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}