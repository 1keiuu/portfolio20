import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { CSSTransition } from "react-transition-group";

type Props = {};

const Header: React.FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <header>
      <div className="menu-items">
        <div className="menu-item__wrapper">
          <Link
            to="/"
            className="menu-item"
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
            className="menu-item"
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
            className="menu-item"
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
            className="menu-item"
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
    </header>
  );
};

export default Header;
