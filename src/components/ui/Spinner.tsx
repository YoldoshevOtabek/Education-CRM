import { Spin } from "antd";
import "./Spinner.css";

interface SpinnerProps {
  size?: "small" | "default" | "large";
  fullscreen?: boolean;
  tip?: string;
}

const Spinner = ({
  size = "large",
  fullscreen = false,
  tip,
}: SpinnerProps) => {
  return (
    <div className={`spinner-wrapper ${fullscreen ? "fullscreen" : ""}`}>
      <Spin size={size} />
      {tip ? <span className="spinner-tip">{tip}</span> : null}
    </div>
  );
};

export default Spinner;
