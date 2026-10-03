import { ConfigProvider, theme as antdTheme } from "antd";
import AppRoute from "./routes/AppRoute";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme
          ? antdTheme.defaultAlgorithm
          : antdTheme.darkAlgorithm,
        token: {
          colorPrimary: "#3E90F0",
          colorBgContainer: theme ? "#ffffff" : "#111515",
          colorBorder: theme ? "#e5e7eb" : "#1c2222",
          colorText: theme ? "#111827" : "#f3f5f7",
        },
      }}
    >
      <AppRoute />
    </ConfigProvider>
  );
}
