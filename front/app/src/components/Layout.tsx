import React, { useState, useEffect } from "react";
import Header from "./Sidebar";
import Sidebar from "./_SideBar";
import "../styles/layout.scss";
import SlideCurtain from "../components/SlideCurtain";
import { CSSTransition } from "react-transition-group";
import * as H from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";

// interface Props {
//   current_page: string;
// }
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const Layout: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <CSSTransition in={isLoaded} classNames="layout" timeout={0}>
      <div className="layout">
        <Header current_page={props.location.pathname}></Header>
        <div className="layout__inner">
          <div className="layout__content">
            <SlideCurtain current_page={props.location.pathname}></SlideCurtain>
            {props.children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default withRouter(Layout);
