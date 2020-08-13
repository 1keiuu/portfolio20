import React from "react";
import "../styles/productCard.scss";
interface Product {
  title: string;
  span: string;
  imageUrl: string;
  backgroundColor: string;
}

interface Props {
  product: Product;
  isHover: boolean;
}

const ProductCard: React.FC<Props> = (props) => {
  return (
    <div
      className="product-card"
      style={{ background: props.product.backgroundColor }}
    >
      <div className="product-card__inner">
        <div className="product-card__image__wrapper">
          <img
            className={
              "product-card__image" + " " + (props.isHover ? "--hover" : "")
            }
            src={props.product.imageUrl}
          ></img>
        </div>
        <div
          className={
            "product-card__title-wrapper" +
            " " +
            (props.isHover ? "--hover" : "")
          }
        >
          <p className="product-card__title">{props.product.title}</p>
          <p className="product-card__sub-title">{props.product.span}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
