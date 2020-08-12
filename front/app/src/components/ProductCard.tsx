import React from "react";
import "../styles/productCard.scss";
interface Product {
  title: string;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = (props) => {
  return (
    <div className="product-card">
      <div className="product-card__inner">
        <div className="product-card__title-wrapper">
          <p>{props.product.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
