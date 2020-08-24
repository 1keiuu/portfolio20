import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { CSSTransition } from "react-transition-group";

type Props = {
  current_page: string;
};

const Header: React.FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <header>
      <div className="menu-items">
        <div className="menu-item__wrapper">
          <Link
            to="/"
            className={
              "menu-item" +
              (selectedItem == "home" ? " --hover" : "") +
              (props.current_page == "" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("home");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            HOME
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
              (props.current_page == "profile" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("profile");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            PROFILE
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
              (props.current_page == "product" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("product");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            PRODUCT
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
              (props.current_page == "contact" ? " --active" : "")
            }
            onMouseEnter={() => {
              setSelectedItem("contact");
            }}
            onMouseLeave={() => {
              setSelectedItem("");
            }}
          >
            CONTACT
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
      <div className="noise"></div>
    </header>
  );
};

export default Header;
