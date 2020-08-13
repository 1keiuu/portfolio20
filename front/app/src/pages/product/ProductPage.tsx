import React, { useState } from "react";
import VerticalSlider from "../../components/VerticalSlider";
import ProductCard from "../../components/ProductCard";
import SlidePagination from "../../components/SlidePagination";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "../../styles/productPage.scss";
const Fade = require("react-reveal/Fade");

SwiperCore.use([Mousewheel]);

const products = [
  { title: "test", backgroundColor: "#7996BF" },
  { title: "test2", backgroundColor: "#658378" },
  { title: "test3", backgroundColor: "#EF6D6D" },
  { title: "test4", backgroundColor: "#7996BF" },
  { title: "test5", backgroundColor: "#658378" },
  { title: "test6", backgroundColor: "#EF6D6D" },
];

const ProductPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Fade bottom delay={500}>
      <div className="product-page">
        <div className="slider__wrapper">
          <VerticalSlider>
            <Swiper
              direction="vertical"
              slidesPerView={1}
              speed={1000}
              spaceBetween={60}
              mousewheel={true}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
              {products.map((product, i) => {
                return (
                  <SwiperSlide key={"product-slide" + i}>
                    <ProductCard
                      product={product}
                      key={"product" + i}
                    ></ProductCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </VerticalSlider>
          <SlidePagination
            currentIndex={currentIndex}
            products={products}
          ></SlidePagination>
        </div>
      </div>
    </Fade>
  );
};

export default ProductPage;
