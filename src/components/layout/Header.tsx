import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="layout-header w-full h-16 border-b flex justify-between items-center px-5 shrink-0">
      <span>Header</span>
      <button
        className={`${theme ? "bg-gray-200" : "bg-[#323337]"} mood`}
        onClick={() => setTheme(!theme)}
        type="button"
        aria-label="Toggle theme"
      >
        {theme ? (
          <i className="bi bi-moon-stars-fill"></i>
        ) : (
          <i className="bi bi-moon-stars"></i>
        )}
      </button>
    </div>
  );
}
