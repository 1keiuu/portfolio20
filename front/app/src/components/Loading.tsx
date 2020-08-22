import React, { useEffect, useState } from "react";
import "../styles/loading.scss";
import { CSSTransition } from "react-transition-group";
interface Props {
  isLoaded: boolean;
}
const Loading: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [props.isLoaded]);
  return (
    <CSSTransition in={isLoaded} classNames="loading__wrapper" timeout={0}>
      <div className="loading__wrapper">
        {/* <img
          className="loading"
          src="https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/icon_loader_a_ww_01_s1.gif"
        ></img> */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
        <div className="circle circle5"></div>
        <div className="circle circle6"></div>

        <div className="loading__inner">
          <div className="loading"></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Loading;
