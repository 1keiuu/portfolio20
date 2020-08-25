import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.scss";
import { CSSTransition } from "react-transition-group";
import igIcon from "../images/ig-icon.png";
import wantedlyIcon from "../images/wantedly_mark.png";
import gitIcon from "../images/GitHub_Icon-white.png";

type Props = {
  current_page: string;
};

const Header: React.FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <nav>
      <div className="menu-items">
        <div className="menu-item__wrapper">
          <Link
            to="/"
            className={
              "menu-item" +
              (selectedItem == "home" ? " --hover" : "") +
              (props.current_page == "/" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("home");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            Home
          </Link>
          <CSSTransition
            in={selectedItem == "home"}
            classNames="underline"
            timeout={0}
          >
            <div className="underline"></div>
          </CSSTransition>
        </div>

        <div className="menu-item__wrapper">
          <Link
            to="/profile"
            className={
              "menu-item" +
              (selectedItem == "profile" ? " --hover" : "") +
              (props.current_page == "/profile" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("profile");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            Profile
          </Link>
          <CSSTransition
            in={selectedItem == "profile"}
            classNames="underline"
            timeout={0}
          >
            <div className="underline"></div>
          </CSSTransition>
        </div>

        <div className="menu-item__wrapper">
          <Link
            to="/product"
            className={
              "menu-item" +
              (selectedItem == "product" ? " --hover" : "") +
              (props.current_page == "/product" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("product");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            Product
          </Link>
          <CSSTransition
            in={selectedItem == "product"}
            classNames="underline"
            timeout={0}
          >
            <div className="underline"></div>
          </CSSTransition>
        </div>

        <div className="menu-item__wrapper">
          <Link
            to="/contact"
            className={
              "menu-item" +
              (selectedItem == "contact" ? " --hover" : "") +
              (props.current_page == "/contact" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("contact");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            Contact
          </Link>
          <CSSTransition
            in={selectedItem == "contact"}
            classNames="underline"
            timeout={0}
          >
            <div className="underline"></div>
          </CSSTransition>
        </div>
      </div>
      <div className="icon__group">
        <div className="icon__wrapper">
          <a
            className="icon__link"
            href="https://github.com/ikkei12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={gitIcon} className="git-icon" />
          </a>
        </div>
        <div className="icon__wrapper">
          <a
            className="icon__link"
            href="https://www.instagram.com/1keiuu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={igIcon} className="ig-icon" />
          </a>
        </div>
        <div className="icon__wrapper">
          <a
            className="icon__link"
            href="https://www.wantedly.com/users/103088073"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={wantedlyIcon} className="wantedly-icon" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
