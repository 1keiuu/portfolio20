import React, { useState, useEffect } from "react";
import "../styles/pageTitle.scss";
import { CSSTransition } from "react-transition-group";
interface Props {
  title: string;
}

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="page-title__inner">
      <CSSTransition
        in={props.title == "product"}
        classNames="page-title__product"
        timeout={500}
      >
        <p className="page-title__product">PRODUCT</p>
      </CSSTransition>
      <CSSTransition
        in={props.title == "profile"}
        classNames="page-title__profile"
        timeout={500}
      >
        <p className="page-title__profile">PROFILE</p>
      </CSSTransition>
      <CSSTransition
        in={props.title == "contact"}
        classNames="page-title__contact"
        timeout={500}
      >
        <p className="page-title__contact">CONTACT</p>
      </CSSTransition>
      <CSSTransition
        in={props.title == "WELCOME"}
        classNames="page-title__home"
        timeout={500}
      >
        <p className="page-title__home">WELCOME</p>
      </CSSTransition>
    </div>
  );
};

const PageTitle: React.FC<Props> = (props) => {
  return <Title title={props.title}></Title>;
};

export default PageTitle;
