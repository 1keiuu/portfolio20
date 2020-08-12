import React, { useEffect } from "react";
import VerticalSlider from "../../components/VerticalSlider";
import ProductCard from "../../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "../../styles/productPage.scss";
const Fade = require("react-reveal/Fade");

SwiperCore.use([Pagination, Mousewheel]);

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
            <Swiper
              direction="vertical"
              slidesPerView={2.5}
              speed={1000}
              spaceBetween={60}
              mousewheel={true}
              pagination={{ dynamicBullets: true }}
            >
              {products.map((product, i) => {
                return (
                  <SwiperSlide>
                    <ProductCard
                      product={product}
                      key={"product" + i}
                    ></ProductCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </VerticalSlider>
        </div>
      </div>
    </Fade>
  );
};

export default ProductPage;
