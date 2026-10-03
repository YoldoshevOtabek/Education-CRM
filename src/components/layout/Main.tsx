import Content from "./Content";
import Header from "./Header";

export default function Main() {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Header />
      <Content />
    </div>
  );
}
