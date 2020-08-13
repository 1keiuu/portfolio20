import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import { BrowserRouter as Router, RouteComponentProps } from "react-router-dom";

import "../styles/layout.scss";
import Home from "../pages/home/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import ProductPage from "../pages/product/ProductPage";
import ContactPage from "../pages/contact/ContactPage";
import SlideCurtain from "../components/SlideCurtain";
import SearchProductBar from "../components/SearchProductBar";
import GopherImage from "../components/GopherImage";

type Props = {} & RouteComponentProps<{ mode: string }>;

const Inner = (props: { current_page: string }) => {
  switch (props.current_page) {
    case "profile":
      return <ProfilePage></ProfilePage>;
    case "product":
      return <ProductPage></ProductPage>;
    case "contact":
      return <ContactPage></ContactPage>;
    default:
      return <Home></Home>;
  }
};
interface SearchProductProps {
  current_page: string;
}
const SearchProduct: React.FC<SearchProductProps> = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  if (props.current_page == "product") {
    return (
      <div className="search-product__wrapper">
        <SearchProductBar isOpen={isSideBarOpen}></SearchProductBar>
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
  return (
    <div className="layout">
      <Sidebar current_page={props.match.params.mode}></Sidebar>
      <div className="layout__inner">
        <Header></Header>
        <div className="layout__content">
          <SlideCurtain current_page={props.match.params.mode}></SlideCurtain>
          <Inner current_page={props.match.params.mode}></Inner>
        </div>
      </div>
      <SearchProduct current_page={props.match.params.mode}></SearchProduct>
    </div>
  );
};

export default Layout;
