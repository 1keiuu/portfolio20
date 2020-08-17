import React from "react";
import "../styles/squareFloatButton.scss";

interface Props {
  is_selected: boolean;
  callback: () => void;
}

const SquareFloatButton: React.FC<Props> = (props) => {
  if (props.is_selected) {
    return (
      <button
        className="square-button"
        onClick={() => {
          props.callback();
        }}
      >
        <p className="square-button__text">{props.children}</p>
      </button>
    );
  } else {
    return (
      <div>
        <button className="square-button --disabled" disabled>
          <p className="square-button__text">{props.children}</p>
        </button>
      </div>
    );
  }
};
export default SquareFloatButton;
