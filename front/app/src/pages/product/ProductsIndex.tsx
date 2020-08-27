import React, { useState, useRef, useEffect } from 'react';
import VerticalSlider from '../../components/VerticalSlider';
import SlidePagination from '../../components/SlidePagination';
import '../../styles/productsIndex.scss';
import axios from 'axios';
import SearchProductBar from '../../components/SearchProductBar';
import GopherImage from '../../components/GopherImage';
import ProductPage from './ProductPage';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addProductsAction } from '../../store/product/actions';
import { addSkillsAction } from '../../store/skill/actions';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
// router
import * as H from 'history';
import {
  RouteComponentProps,
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Fade = require('react-reveal/Fade');

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

const ProductsIndex: React.FC<Props> = (props) => {
  const isFirstRenderRef = useRef(true);
  const isLoadedRef = useRef(false);

  const [products, setProducts] = useState<Product[]>([]);

  //swiper
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const changeCurrentSlide = (i: number) => {
    swiper!.slideTo(i);
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
        const arr = product.skill_ids.split(',');
        return arr.includes(item.id.toString());
      });
      setSelectedProducts(newProducts);
    });
    setIsSideBarOpen(false);
  };

  const fetchProducts = async (swiper: SwiperCore) => {
    const PRODUCTS_URL = `${process.env.REACT_APP_API_URL}/api/products`;

    await axios.get(PRODUCTS_URL).then((res) => {
      handleAddProducts(res.data.products);
      setProducts(res.data.products);
      res.data.products.forEach((product: Product, i: number) => {
        addSlide(swiper, product, i);
      });
    });
  };

  const addSlide = (swiper: SwiperCore, product: Product, i: number) => {
    const slide = `<div class="swiper-slide product-card">
      <div class="product-card__overlay" id="slide${i}"></div>
      <img
        class="product-card__image"
        src=${product.images.split(',')[0]}
      ></img>
      <div class="product-card__title-wrapper">
        <p class="product-card__title">${product.title}</p>
        <p class="product-card__sub-title">${product.span}</p>
      </div>
    </div>`;

    swiper!.addSlide(1 + i, slide);

    const slideElm = document.getElementById('slide' + String(i));
    slideElm?.addEventListener('click', (e) => {
      const id = product.id;
      setTimeout(() => {
        props.history.push({
          pathname: '/product/' + id,
          state: { product: product },
        });
      }, 500);
    });
  };

  useEffect(() => {
    isFirstRenderRef.current = false;
    isLoadedRef.current = true;
    const SKILLS_URL = `${process.env.REACT_APP_API_URL}/api/skills`;
    const fetchSkills = async () => {
      await axios.get(SKILLS_URL).then((res) => {
        handleAddSkills(res.data.skills);
      });
    };
    fetchSkills();
  }, []);

  const handleReachEnd = (func: () => void) => {
    // 初回ロード時にスライドがないと見做されてcontactページへ遷移してしまうのを避ける
    if (!isFirstRenderRef.current) {
      func();
    }
  };
  return (
    <CSSTransition
      in={isLoadedRef.current}
      classNames="product-page__inner"
      timeout={0}
    >
      <div className="product-page__inner">
        <Switch>
          <Route exact path="/product">
            <div className="product-page">
              <div className="slider__wrapper">
                <VerticalSlider>
                  <Swiper
                    slidesPerView={2}
                    centeredSlides
                    speed={1000}
                    spaceBetween={0}
                    direction="vertical"
                    mousewheel={true}
                    initialSlide={1}
                    onSwiper={(swiper) => {
                      setSwiper(swiper);
                      fetchProducts(swiper);
                    }}
                    observer={true}
                    onReachBeginning={() => {
                      isLoadedRef.current = false;
                      setTimeout(() => {
                        props.history.push('/profile');
                      }, 500);
                    }}
                    onReachEnd={() => {
                      isLoadedRef.current = false;
                      handleReachEnd(() => {
                        setTimeout(() => {
                          props.history.push('/contact');
                        }, 500);
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
                  currentIndex={currentIndex - 1}
                  products={products}
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
                  'search-product__background' +
                  ' ' +
                  (isSideBarOpen ? '--active' : '')
                }
              ></div>
            </div>
          </Route>
          <Route
            path={`${props.match.path}/:id`}
            render={(e) => {
              return <ProductPage></ProductPage>;
            }}
          ></Route>
        </Switch>
      </div>
    </CSSTransition>
  );
};

export default withRouter(ProductsIndex);
