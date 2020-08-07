import React, { useEffect, useState, useRef } from "react";
import "../styles/SlideCurtain.scss";
import { RouteComponentProps } from "react-router";
import { CSSTransition } from "react-transition-group";

type Props = {
  current_page: string;
};
//  & RouteComponentProps<{ mode: string }>;

const SlideCurtain: React.FC<Props> = (props) => {
  const currentStatus = React.useRef(false);
  const isFirstRef = React.useRef(true);
  const change = () => {
    setTimeout(() => {
      currentStatus.current = false;
    });
  };
  useEffect(() => {
    // if (isFirstRef.current) {
    //   // 初回描画時
    //   isFirstRef.current = false;
    // } else {
    //   currentStatus.current = true;
    // }
    currentStatus.current = true;
    console.log(currentStatus.current);
  });
  return (
    <CSSTransition
      in={currentStatus.current}
      classNames="slide-curtain"
      timeout={0}
      onEntered={() => {
        setTimeout(() => {
          currentStatus.current = false;
        });
      }}
    >
      <div className="slide-curtain"></div>
    </CSSTransition>
  );
};

export default SlideCurtain;
