import React, { useState } from "react";
import "../styles/sidebar.scss";
import { RouteComponentProps } from "react-router-dom";
import PageTitle from "./PageTitle";

type Props = {
  current_page: string;
};

const SideBar: React.FC<Props> = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar__inner"></div>
      <div className="page-title__wrapper">
        <PageTitle
          title={props.current_page ? props.current_page : "WELCOME"}
        ></PageTitle>
      </div>
    </div>
  );
};

export default SideBar;
