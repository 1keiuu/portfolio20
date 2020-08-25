import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import "../styles/layout.scss";
import SlideCurtain from "../components/SlideCurtain";
import { CSSTransition } from "react-transition-group";

interface Props {
  current_page: string;
}

const Layout: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <CSSTransition in={isLoaded} classNames="layout" timeout={0}>
      <div className="layout">
        {/* <Sidebar current_page={props.current_page}></Sidebar> */}
        <Header current_page={props.current_page}></Header>
        <div className="layout__inner">
          <div className="layout__content">
            <SlideCurtain current_page={props.current_page}></SlideCurtain>
            {props.children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Layout;
