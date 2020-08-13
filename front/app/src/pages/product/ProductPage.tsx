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
  {
    title: "test",
    span: "2020/02~2020/07",
    backgroundColor: "#7996BF",
    imageUrl: "https://loremflickr.com/640/360",
  },
  {
    title: "test2",
    span: "2020/02~2020/07",
    backgroundColor: "#658378",
    imageUrl: "https://loremflickr.com/640/360",
  },
  {
    title: "test3",
    span: "2020/02~2020/07",
    backgroundColor: "#EF6D6D",
    imageUrl: "https://loremflickr.com/640/360",
  },
  {
    title: "test4",
    span: "2020/02~2020/07",
    backgroundColor: "#7996BF",
    imageUrl: "https://loremflickr.com/640/360",
  },
  {
    title: "test5",
    span: "2020/02~2020/07",
    backgroundColor: "#658378",
    imageUrl: "https://loremflickr.com/640/360",
  },
  {
    title: "test6",
    span: "2020/02~2020/07",
    backgroundColor: "#EF6D6D",
    imageUrl: "https://loremflickr.com/640/360",
  },
];

const ProductPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <Fade bottom delay={500}>
      <div className="product-page">
        <div className="slider__wrapper">
          <VerticalSlider>
            <Swiper
              direction="vertical"
              slidesPerView={2}
              speed={1000}
              // spaceBetween={60}
              mousewheel={true}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
              {products.map((product, i) => {
                return (
                  <SwiperSlide
                    key={"product-slide" + i}
                    onMouseEnter={() => {
                      setHoveredIndex(i);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(-1);
                    }}
                  >
                    <ProductCard
                      product={product}
                      isHover={i == hoveredIndex}
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
