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
import SkillPage from "../pages/skill/SkillPage";
import ProductPage from "../pages/product/ProductPage";
import ContactPage from "../pages/contact/ContactPage";

type Props = {} & RouteComponentProps<{ mode: string }>;

const Inner = (props: { current_page: string }) => {
  switch (props.current_page) {
    case "profile":
      return <SkillPage></SkillPage>;
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
        <Inner current_page={props.match.params.mode}></Inner>
      </div>
    </div>
  );
};

export default Layout;
