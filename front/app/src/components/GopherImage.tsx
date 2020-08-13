import React from "react";
import imgSrc from "../images/hi.png";
import "../styles/gopherImage.scss";

interface Props {
  callback: () => void;
}

const GopherImage: React.FC<Props> = (props) => {
  return (
    <div
      className="gopher-image__wrapper"
      onClick={() => {
        props.callback();
      }}
    >
      <p className="gopher-image__creater">
        By
        <a
          href="https://twitter.com/tenntenn"
          target="_blank"
          rel="noopener noreferrer"
          className="gopher-image__creater-link"
        >
          　Takuya Ueda
        </a>
      </p>
      <img src={imgSrc} className="gopher-image"></img>
    </div>
  );
};

export default GopherImage;
