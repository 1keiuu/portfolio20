import React from "react";
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
export default class Header extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }
  changeMenuStatus(type: string) {
    if (type === "open") {
      this.setState({ isMenuOpen: true });
    } else {
      this.setState({ isMenuOpen: false });
    }
  }

  render() {
    return (
      <header
        className={
          "header" + " " + (this.state.isMenuOpen ? "--is-menu-open" : "")
        }
      >
        <CSSTransition
          in={this.state.isMenuOpen}
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
                in={this.state.isMenuOpen}
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
          className={"title" + " " + (this.state.isMenuOpen ? "--open" : "")}
        />
        <img
          src={titleWhite}
          className={
            "white-title" + " " + (this.state.isMenuOpen ? "--open" : "")
          }
        />
        <CSSTransition
          in={this.state.isMenuOpen}
          classNames="close-button"
          timeout={0}
        >
          <MenuButton
            isMenuOpen={this.state.isMenuOpen}
            click={() => {
              if (!this.state.isMenuOpen) {
                this.changeMenuStatus("open");
              } else {
                this.changeMenuStatus("close");
              }
            }}
          />
        </CSSTransition>
      </header>
    );
  }
}
