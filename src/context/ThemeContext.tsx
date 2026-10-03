import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const themeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

function readSavedTheme(): boolean {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  } catch {
    return true;
  }
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<boolean>(readSavedTheme);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme) {
      root.classList.add("light");
      root.classList.remove("dark");
      body.classList.add("light");
      body.classList.remove("dark");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      body.classList.remove("light");
      body.classList.add("dark");
    }

    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error("useTheme ThemeProvider ichida ishlatilishi kerak");
  }

  return context;
}

export default ThemeProvider;
