import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { priviteRoute } from "../../routes/Route";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const currentSection =
    priviteRoute.find(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`)
    )?.title ?? "Dashboard";

  return (
    <div className="layout-header w-full h-16 border-b flex justify-between items-center px-5 shrink-0">
      <h1 className="text-lg font-semibold m-0">{currentSection}</h1>
      <button
        className={`${theme ? "bg-gray-200" : "bg-[#323337]"} mood`}
        onClick={() => setTheme(!theme)}
        type="button"
        aria-label="Toggle theme"
      >
        {theme ? (
          <i className="bi bi-sun-fill"></i>
        ) : (
          <i className="bi bi-moon-stars-fill"></i>
        )}
      </button>
    </div>
  );
}
