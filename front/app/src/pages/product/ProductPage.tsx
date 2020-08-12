import React, { useEffect } from "react";
import VerticalSlider from "../../components/VerticalSlider";
import ProductCard from "../../components/ProductCard";

import "../../styles/productPage.scss";
const Fade = require("react-reveal/Fade");

const products = [
  { title: "test" },
  { title: "test2" },
  { title: "test3" },
  { title: "test4" },
  { title: "test5" },
  { title: "test6" },
];

const ProductPage: React.FC = () => {
  return (
    <Fade bottom delay={500}>
      <div className="product-page">
        <div className="slider__wrapper">
          <VerticalSlider>
            {products.map((product, i) => {
              return (
                <ProductCard
                  product={product}
                  key={"product" + i}
                ></ProductCard>
              );
            })}
          </VerticalSlider>
        </div>
      </div>
    </Fade>
  );
};

export default ProductPage;
