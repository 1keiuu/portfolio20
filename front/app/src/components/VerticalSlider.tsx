import React from "react";
import "../styles/verticalSlider.scss";

const VerticalSlider: React.FC = (props) => {
  return (
    <div className="vertical-slider">
      <div className="vertical-slider__inner">{props.children}</div>
    </div>
  );
};

export default VerticalSlider;
