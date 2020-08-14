import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addProductsAction } from "../store/counter/actions";

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
interface SearchProductProps {
  current_page: string;
}
interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  images: string;
  descriptions: string;
}
const skilltypes = [
  {
    title: "Frontend",
    skills: [
      {
        id: 1,
        name: "string1",
        imageURL: "http://placehold.jp/350x150.png",
        backgroundColor: "green",
      },
      {
        id: 2,
        name: "string2",
        imageURL: "http://placehold.jp/350x150.png",
        backgroundColor: "blue",
      },
      {
        id: 3,
        name: "string2.1",
        imageURL: "http://placehold.jp/350x150.png",
        backgroundColor: "green",
      },
      {
        id: 4,
        name: "string2.2",
        imageURL: "http://placehold.jp/350x150.png",
        backgroundColor: "green",
      },
      {
        id: 5,
        name: "string2.3",
        imageURL: "http://placehold.jp/350x150.png",
        backgroundColor: "green",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        id: 6,
        name: "string3",
        imageURL: "http://placehold.jp/250x150.png",
        backgroundColor: "red",
      },
      {
        id: 7,
        name: "string4",
        imageURL: "http://placehold.jp/350x350.png",
        backgroundColor: "blue",
      },
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      {
        id: 8,
        name: "string6",
        imageURL: "http://placehold.jp/350x350.png",
        backgroundColor: "blue",
      },
    ],
  },
];

const SearchProduct: React.FC<SearchProductProps> = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  if (props.current_page == "product") {
    return (
      <div className="search-product__wrapper">
        <SearchProductBar
          skilltypes={skilltypes}
          isOpen={isSideBarOpen}
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
  const currentCount = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  // action を発行する関数
  // 引数にはaction creatorを渡す
  // 親のrenderごとに子のrenderが走るので、useCallbackを用いメモ化すべき。
  const handleIncrement = (products: any) => {
    dispatch(addProductsAction(products));
  };

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/api/products`;
    axios.get(URL).then((res) => {
      handleIncrement(res.data.products);
    });
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
            products={currentCount.value}
          ></Inner>
        </div>
      </div>
      <SearchProduct current_page={props.match.params.mode}></SearchProduct>
    </div>
  );
};

export default Layout;
