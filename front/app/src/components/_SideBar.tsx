import React, { useState } from "react";
import "../styles/sidebar.scss";
import PageTitle from "./PageTitle";
import igIcon from "../images/ig-icon.png";
import wantedlyIcon from "../images/wantedly_mark.png";
import gitIcon from "../images/GitHub_Icon.png";

type Props = {
  current_page: string;
};

const SideBar: React.FC<Props> = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <p className="my-name">Ikkei Harashima</p>
        <div className="icon__group">
          <a
            href="https://github.com/ikkei12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={gitIcon} className="git-icon" />
          </a>
          <a
            href="https://www.instagram.com/1keiuu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={igIcon} className="ig-icon" />
          </a>
          <a
            href=" https://www.wantedly.com/users/103088073"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={wantedlyIcon} className="wantedly-icon" />
          </a>
        </div>
      </div>
      <div className="page-title__wrapper">
        <PageTitle
          title={props.current_page ? props.current_page : "WELCOME"}
        ></PageTitle>
      </div>
    </div>
  );
};

export default SideBar;
