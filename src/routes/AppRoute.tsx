import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import Groups from "../features/groups/Groups";
import Reception from "../features/reception/Reception";
import Students from "../features/students/Students";
import Teacher from "../features/teacher/Teacher";
import Layout from "../components/layout/Layout";
import Course from "../features/course/Course";
import Login from "../features/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import DirectionPage from "../features/directions/Directions";

export default function AppRoute() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/direction" element={<DirectionPage />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teacher" element={<Teacher />} />
        </Route>
      </Route>

      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
