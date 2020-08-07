import React from "react";
const Fade = require("react-reveal/Fade");

const ProductPage: React.FC = () => {
  return (
    <Fade bottom delay={1500}>
      <div>Product</div>
    </Fade>
  );
};

export default ProductPage;
