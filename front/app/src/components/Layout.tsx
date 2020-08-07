import React from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";

import "../styles/layout.scss";
import Home from "../pages/home/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import ProductPage from "../pages/product/ProductPage";
import ContactPage from "../pages/contact/ContactPage";
import SlideCurtain from "../components/SlideCurtain";

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
    </div>
  );
};

export default Layout;
