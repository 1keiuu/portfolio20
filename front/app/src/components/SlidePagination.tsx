import React from "react";
import "../styles/SlidePagination.scss";

interface Props {
  currentIndex: number;
  products: { title: string; backgroundColor: string }[];
}

const SlidePagination: React.FC<Props> = (props) => {
  return (
    <div className="slide-pagination">
      {props.products.map((product, i) => {
        return (
          <span
            className={
              "slide-pagination__dot " +
              (i == props.currentIndex ? "--active" : "")
            }
          ></span>
        );
      })}
    </div>
  );
};

export default SlidePagination;
