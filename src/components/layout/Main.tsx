import Content from "./Content";
import Header from "./Header";

export default function Main() {
  return (
    <div className="main-shell w-full h-screen flex flex-col overflow-hidden bg-[var(--bg-page)] text-[var(--text)]">
      <Header />
      <Content />
    </div>
  );
}
