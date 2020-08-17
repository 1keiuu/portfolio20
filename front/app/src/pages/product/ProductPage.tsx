import React, { useState, useRef, useEffect } from "react";
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

interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  images: string;
  descriptions: string;
}
interface Props {
  products: Product[];
}
const ProductPage: React.FC<Props> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "string",
      span: "string",
      background_color: "#333",
      images: "string",
      descriptions: "string",
    },
    {
      id: 1,
      title: "string",
      span: "string",
      background_color: "#333",
      images: "string",
      descriptions: "string",
    },
    {
      id: 1,
      title: "string",
      span: "string",
      background_color: "#333",
      images: "string",
      descriptions: "string",
    },
  ]);
  const [swiper, setSwiper] = useState({
    slideTo: (i: number) => {},
    slideNext: () => {},
    removeSlide: (i: number) => {},
  });
  const changeCurrentSlide = (i: number) => {
    swiper.slideTo(i);
  };
  // useEffect(() => {
  //   const newProduct = [...props.products];
  //   setProducts(newProduct);
  // }, [props.products]);
  return (
    <Fade bottom delay={500}>
      <div className="product-page">
        <div className="slider__wrapper">
          <VerticalSlider>
            <Swiper
              direction="vertical"
              slidesPerView={2}
              speed={1000}
              centeredSlides={true}
              spaceBetween={60}
              mousewheel={true}
              onSwiper={(swiper) => setSwiper(swiper)}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.activeIndex);
              }}
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
                      callback={() => {
                        changeCurrentSlide(i);
                      }}
                    ></ProductCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </VerticalSlider>

          <SlidePagination
            currentIndex={currentIndex}
            products={products}
            callback={(i: number) => {
              changeCurrentSlide(i);
            }}
          ></SlidePagination>
        </div>
      </div>
    </Fade>
  );
};

export default ProductPage;
