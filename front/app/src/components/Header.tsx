import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";
import "../styles/header.scss";
import { CSSTransition } from "react-transition-group";

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
        className="menu-icon__wrapper --is-open"
        onClick={() => {
          props.click();
        }}
      >
        <CloseIcon />
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
          classNames="menu-items__inner"
          timeout={0}
        >
          <div
            className="menu-items__inner"
            onClick={() => {
              this.changeMenuStatus("close");
            }}
          >
            <Link to="/" className="menu-item">
              home
            </Link>
            <Link to="/skills" className="menu-item">
              skill
            </Link>
          </div>
        </CSSTransition>
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
      </header>
    );
  }
}
