import React from "react";
import "../styles/SlidePagination.scss";

interface Props {
  currentIndex: number;
}

const SlidePagination: React.FC<Props> = (props) => {
  return <div className="slide-pagination">{props.currentIndex}</div>;
};

export default SlidePagination;
