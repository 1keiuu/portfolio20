import React from "react";
import "../styles/SlidePagination.scss";
interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  images: string;
  descriptions: string;
}
interface Props {
  currentIndex: number;
  products: Product[];
  callback: (i: number) => void;
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
            onClick={() => {
              props.callback(i);
            }}
          ></span>
        );
      })}
    </div>
  );
};

export default SlidePagination;
