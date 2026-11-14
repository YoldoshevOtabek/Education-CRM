import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../features/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import { priviteRoute } from "./Route";
import { Suspense } from "react";
import CheckRole from "./CheckRole";
import Unauthorized from "../features/auth/Unauthorized";

export default function AppRoute() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
      <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
         
         {priviteRoute.map(item => {
          return(
            <Route
            key={item.id}
            path={item.path}
            element={
            <Suspense fallback={"Loading..."}>
              <CheckRole roles={item.role}>
              <item.element/>
              </CheckRole>
            </Suspense>
              }
            />
          )
         })}
        </Route>
      </Route>

      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
