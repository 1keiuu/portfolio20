import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addProductsAction } from "../store/product/actions";
import { addSkillsAction } from "../store/skill/actions";

import Header from "./Header";
import Sidebar from "./SideBar";
import { BrowserRouter as Router, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import "../styles/layout.scss";
import Home from "../pages/home/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import ProductPage from "../pages/product/ProductPage";
import ContactPage from "../pages/contact/ContactPage";
import SlideCurtain from "../components/SlideCurtain";
import SearchProductBar from "../components/SearchProductBar";
import GopherImage from "../components/GopherImage";

type Props = {} & RouteComponentProps<{ mode: string }>;

const Inner = (props: { current_page: string; products: Product[] }) => {
  switch (props.current_page) {
    case "profile":
      return <ProfilePage></ProfilePage>;
    case "product":
      return <ProductPage products={props.products}></ProductPage>;
    case "contact":
      return <ContactPage></ContactPage>;
    default:
      return <Home></Home>;
  }
};

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
  change_products: (arr: Skill[]) => void;
}

const SearchProduct: React.FC<SearchProductProps> = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleDecideButtonClick = (selectedItems: Skill[]) => {
    props.change_products(selectedItems);
    setIsSideBarOpen(false);
  };

  if (props.current_page == "product") {
    return (
      <div className="search-product__wrapper">
        <SearchProductBar
          skills={props.skills}
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
    );
  } else {
    return <div></div>;
  }
};

const Layout: React.FC<Props> = (props) => {
  const storeProducts = useSelector((state: RootState) => state.product);
  const storeSkills = useSelector((state: RootState) => state.skill);

  const dispatch = useDispatch();

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
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // action を発行する関数
  // 引数にはaction creatorを渡す
  // 親のrenderごとに子のrenderが走るので、useCallbackを用いメモ化すべき。
  const handleAddProducts = (products: Product[]) => {
    dispatch(addProductsAction(products));
  };
  const handleAddSkills = (skills: any) => {
    dispatch(addSkillsAction(skills));
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
    <div className="layout">
      <Sidebar current_page={props.match.params.mode}></Sidebar>
      <div className="layout__inner">
        <Header></Header>
        <div className="layout__content">
          <SlideCurtain current_page={props.match.params.mode}></SlideCurtain>
          <Inner
            current_page={props.match.params.mode}
            products={selectedProducts}
          ></Inner>
        </div>
      </div>
      <SearchProduct
        current_page={props.match.params.mode}
        skills={storeSkills.value}
        change_products={(selectedItems: Skill[]) => {
          selectedItems.forEach((item) => {
            const newProducts = products.filter((product) => {
              const arr = product.skill_ids.split(",");
              return arr.includes(item.id.toString());
            });
            setSelectedProducts(newProducts);
          });
        }}
      ></SearchProduct>
      <div className="noise"></div>
    </div>
  );
};

export default Layout;
