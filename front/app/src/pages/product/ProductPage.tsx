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
  { title: "test" },
  { title: "test2" },
  { title: "test3" },
  { title: "test4" },
  { title: "test5" },
  { title: "test6" },
];

const ProductPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Fade bottom delay={500}>
      <div className="product-page">
        <div className="slider__wrapper">
          <SlidePagination currentIndex={currentIndex}></SlidePagination>
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
