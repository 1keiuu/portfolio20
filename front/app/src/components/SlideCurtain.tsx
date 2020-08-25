import React, { useEffect, useRef } from "react";
import "../styles/SlideCurtain.scss";
import { RouteComponentProps } from "react-router";
import { CSSTransition } from "react-transition-group";

type Props = {
  current_page: string;
};

const SlideCurtain: React.FC<Props> = (props) => {
  const currentStatus = useRef(false);

  useEffect(() => {
    currentStatus.current = true;
  }, []);
  return (
    <CSSTransition
      in={currentStatus.current}
      classNames="slide-curtain"
      timeout={0}
    >
      <div className="slide-curtain"></div>
    </CSSTransition>
  );
};

export default SlideCurtain;
