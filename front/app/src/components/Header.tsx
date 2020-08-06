import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import ArrowIcon from "./ArrowIcon";
import "../styles/header.scss";
import { CSSTransition } from "react-transition-group";

type Props = {};

// const MenuButton = (props: any) => {
//   if (!props.isMenuOpen) {
//     return (
//       <div
//         className="menu-icon__wrapper"
//         onClick={() => {
//           props.click();
//         }}
//       >
//         <MenuIcon />
//       </div>
//     );
//   } else {
//     return (
//       <div
//         className="close-button"
//         onClick={() => {
//           props.click();
//         }}
//       >
//         <div className="close-button__inner">
//           <p>Close</p>
//           <div className="close-icon__wrapper">
//             <ArrowIcon isLeft={false} fill="#f8f2ee" />
//           </div>
//         </div>
//       </div>
//     );
//   }
// };
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
      <div className="menu-items">
        <Link to="/" className="menu-item">
          Home
        </Link>
        <Link to="/profile" className="menu-item">
          Profile
        </Link>
        <Link to="/product" className="menu-item">
          Product
        </Link>
        <Link to="/contact" className="menu-item">
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
    </header>
  );
};

export default Header;
