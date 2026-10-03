import { Spin } from "antd";
import "./Spinner.css";

interface SpinnerProps {
  size?: "small" | "default" | "large";
  fullscreen?: boolean;
}

const Spinner = ({
  size = "large",
  fullscreen = false,
}: SpinnerProps) => {
  return (
    <div className={`spinner-wrapper ${fullscreen ? "fullscreen" : ""}`}>
      <Spin size={size} />
    </div>
  );
};

export default Spinner;