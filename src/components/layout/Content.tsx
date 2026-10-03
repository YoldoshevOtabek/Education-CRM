import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="page-content w-full flex-1 overflow-y-auto p-6">
      <Outlet />
    </div>
  );
}
