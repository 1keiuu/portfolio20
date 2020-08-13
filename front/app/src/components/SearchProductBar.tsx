import React from "react";
import "../styles/SearchProductBar.scss";
import { CSSTransition } from "react-transition-group";
interface Props {
  isOpen: boolean;
}

const SearchProductBar: React.FC<Props> = (props) => {
  return (
    <CSSTransition
      in={props.isOpen}
      classNames="search-product__bar"
      timeout={0}
    >
      <div className="search-product__bar">
        <div className="search-product__selected-words"></div>
      </div>
    </CSSTransition>
  );
};

export default SearchProductBar;
