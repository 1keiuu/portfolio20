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
// router
import * as H from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

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
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const ProductPage: React.FC<Props> = (props) => {
  const isLoadedRef = useRef(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "title1",
      span: "2020/02~2020/07",
      background_color: "#fff",
      images: "https://placekitten.com/640/360",
      descriptions: "desc",
      skill_ids: "1,2",
    },
    // {
    //   id: 1,
    //   title: "title2",
    //   span: "2020/02~2020/07",
    //   background_color: "#fff",
    //   images: "https://placekitten.com/640/360",
    //   descriptions: "desc",
    //   skill_ids: "2,5",
    // },
    // {
    //   id: 1,
    //   title: "title3",
    //   span: "2020/02~2020/07",
    //   background_color: "#fff",
    //   images: "https://placekitten.com/640/360",
    //   descriptions: "desc",
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

  const initializeSlide = (swiper: SwiperCore) => {
    products.forEach((product, i) => {
      const slide = `<div class="swiper-slide" id="slide${i}">
          <div class="product-card" id="product-card${i}"
          style="background: ${product.background_color}"
      >
        <div class="product-card__inner">
          <div class="product-card__image__wrapper">
            <img
              class="product-card__image"
              src=${product.images.split(",")[0]}
            ></img>
          </div>
          <div
            class=
              "product-card__title-wrapper"
          >
            <p class="product-card__title">${product.title}</p>
            <p class="product-card__sub-title">${product.span}</p>
          </div>
        </div>
      </div>
      </div>`;

      swiper.addSlide(1 + i, slide);

      const a = document.getElementById(String(i));
      a?.addEventListener("mouseenter", (e) => {
        const id = (e.target! as Element).getAttribute("id");
        setHoveredIndex(Number(id));
        console.log(hoveredIndex);
      });
    });
  };

  useEffect(() => {
    isLoadedRef.current = true;

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

  const handleReachEnd = (func: () => void) => {
    // 初回ロード時にスライドがないと見做されてcontactページへ遷移してしまうのを避ける
    if (isLoadedRef.current) {
      func();
    }
  };
  return (
    <CSSTransition
      in={isLoadedRef.current}
      classNames="product-page"
      timeout={0}
    >
      <Fade bottom delay={500}>
        <div className="product-page">
          <div className="slider__wrapper">
            <VerticalSlider>
              <Swiper
                slidesPerView={2}
                centeredSlides
                speed={1000}
                spaceBetween={60}
                direction="vertical"
                mousewheel={true}
                initialSlide={1}
                onSwiper={(swiper) => {
                  setSwiper(swiper);
                  initializeSlide(swiper);
                }}
                observer={true}
                onReachBeginning={() => {
                  props.history.push("/profile");
                }}
                onReachEnd={() => {
                  handleReachEnd(() => {
                    props.history.push("/contact");
                  });
                }}
                onSlideChange={(swiper) => {
                  setCurrentIndex(swiper.activeIndex);
                }}
              >
                <SwiperSlide></SwiperSlide>

                <SwiperSlide></SwiperSlide>
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
    </CSSTransition>
  );
};

export default ProductPage;
