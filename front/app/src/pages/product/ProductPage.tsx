import React, { useState, useRef, useEffect } from "react";
import VerticalSlider from "../../components/VerticalSlider";
import ProductCard from "../../components/ProductCard";
import SlidePagination from "../../components/SlidePagination";
import "../../styles/productPage.scss";
import axios from "axios";
import SearchProductBar from "../../components/SearchProductBar";
import GopherImage from "../../components/GopherImage";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addProductsAction } from "../../store/product/actions";
import { addSkillsAction } from "../../store/skill/actions";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

const Fade = require("react-reveal/Fade");

SwiperCore.use([Mousewheel]);

interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  images: string;
  descriptions: string;
  skill_ids: string;
}

interface Skill {
  id: number;
  name: string;
  image_url: string;
  background_color: string;
  skill_type_name: string;
}

interface SearchProductProps {
  current_page: string;
  skills: {
    skill_type_name: string;
    id: number;
    name: string;
    background_color: string;
    image_url: string;
  }[];
}
interface Props {}
const ProductPage: React.FC<Props> = (props) => {
  const [products, setProducts] = useState<Product[]>([
    // {
    //   id: 1,
    //   title: "string",
    //   span: "string",
    //   background_color: "#333",
    //   images: "string",
    //   descriptions: "string",
    //   skill_ids: "1,2",
    // },
    // {
    //   id: 1,
    //   title: "string",
    //   span: "string",
    //   background_color: "#333",
    //   images: "string",
    //   descriptions: "string",
    //   skill_ids: "2,5",
    // },
    // {
    //   id: 1,
    //   title: "string",
    //   span: "string",
    //   background_color: "#333",
    //   images: "string",
    //   descriptions: "string",
    //   skill_ids: "2,4",
    // },
  ]);

  //swiper
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [swiper, setSwiper] = useState({
    slideTo: (i: number) => {},
    slideNext: () => {},
    removeSlide: (i: number) => {},
  });
  const changeCurrentSlide = (i: number) => {
    swiper.slideTo(i);
  };
  //store
  const storeProducts = useSelector((state: RootState) => state.product);
  const storeSkills = useSelector((state: RootState) => state.skill);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const handleAddProducts = (products: Product[]) => {
    dispatch(addProductsAction(products));
  };
  const handleAddSkills = (skills: any) => {
    dispatch(addSkillsAction(skills));
  };

  // sidebar
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleDecideButtonClick = (selectedItems: Skill[]) => {
    // 絞り込み機能
    selectedItems.forEach((item) => {
      const newProducts = products.filter((product) => {
        const arr = product.skill_ids.split(",");
        return arr.includes(item.id.toString());
      });
      setSelectedProducts(newProducts);
    });
    setIsSideBarOpen(false);
  };

  useEffect(() => {
    const PRODUCTS_URL = `${process.env.REACT_APP_API_URL}/api/products`;
    const SKILLS_URL = `${process.env.REACT_APP_API_URL}/api/skills`;

    const get = async () => {
      await axios.get(PRODUCTS_URL).then((res) => {
        handleAddProducts(res.data.products);
        setSelectedProducts(res.data.products);
      });
      await axios.get(SKILLS_URL).then((res) => {
        handleAddSkills(res.data.skills);
      });
    };
    get();
  }, []);
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
              {selectedProducts.map((product, i) => {
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
            products={selectedProducts}
            callback={(i: number) => {
              changeCurrentSlide(i);
            }}
          ></SlidePagination>
        </div>
      </div>

      <div className="search-product__wrapper">
        <SearchProductBar
          skills={storeSkills.value}
          isOpen={isSideBarOpen}
          decide_button_callback={(selectedItems) => {
            handleDecideButtonClick(selectedItems);
          }}
        ></SearchProductBar>
        <GopherImage
          callback={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
        ></GopherImage>
        <div
          onClick={() => {
            setIsSideBarOpen(false);
          }}
          className={
            "search-product__background" +
            " " +
            (isSideBarOpen ? "--active" : "")
          }
        ></div>
      </div>
    </Fade>
  );
};

export default ProductPage;
