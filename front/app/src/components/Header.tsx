import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import ArrowIcon from "./ArrowIcon";
import "../styles/header.scss";
import { CSSTransition } from "react-transition-group";
import title from "../images/title.png";
import titleWhite from "../images/title-white.png";

interface Props {}
interface State {
  isMenuOpen: boolean;
}
const MenuButton = (props: any) => {
  if (!props.isMenuOpen) {
    return (
      <div
        className="menu-icon__wrapper"
        onClick={() => {
          props.click();
        }}
      >
        <MenuIcon />
      </div>
    );
  } else {
    return (
      <div
        className="close-button"
        onClick={() => {
          props.click();
        }}
      >
        <div className="close-button__inner">
          <p>Close</p>
          <div className="close-icon__wrapper">
            <ArrowIcon isLeft={false} fill="#f8f2ee" />
          </div>
        </div>
      </div>
    );
  }
};
const Header: React.FC<Props> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeMenuStatus = (type: string) => {
    if (type === "open") {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={"header" + " " + (isMenuOpen ? "--is-menu-open" : "")}>
      <CSSTransition
        in={isMenuOpen}
        classNames="menu-items__back-ground"
        timeout={0}
      >
        <div className="menu-items__back-ground">
          <div className="menu-items__inner">
            <div className="menu-items">
              <Link to="/" className="menu-item">
                Home
              </Link>
              <Link to="/skills" className="menu-item">
                Product
              </Link>
              <Link to="/" className="menu-item">
                Carrer
              </Link>
              <Link to="/" className="menu-item">
                Contact
              </Link>
            </div>
            <CSSTransition
              in={isMenuOpen}
              classNames="menu-items__underline"
              timeout={0}
            >
              <div className="menu-items__underline"></div>
            </CSSTransition>
          </div>
        </div>
      </CSSTransition>

      <img
        src={title}
        className={"title" + " " + (isMenuOpen ? "--open" : "")}
        alt="title"
      />
      <img
        src={titleWhite}
        className={"white-title" + " " + (isMenuOpen ? "--open" : "")}
      />
      <CSSTransition in={isMenuOpen} classNames="close-button" timeout={0}>
        <MenuButton
          isMenuOpen={isMenuOpen}
          click={() => {
            if (!isMenuOpen) {
              changeMenuStatus("open");
            } else {
              changeMenuStatus("close");
            }
          }}
        />
      </CSSTransition>
    </header>
  );
};

export default Header;
