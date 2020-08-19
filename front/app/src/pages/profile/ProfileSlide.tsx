import React, { useState, useEffect } from "react";
import "../../styles/profileSlide.scss";
import profileImg from "../../images/profile.jpeg";
import { CSSTransition } from "react-transition-group";
const Fade = require("react-reveal/Fade");

interface Props {
  isLoad: boolean;
}

const ProfileSlide: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (props.isLoad) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [props.isLoad]);
  return (
    <div className="slide profile__slide">
      <div className="slide-upper">
        <div className="slide-upper__image-wrapper">
          <CSSTransition
            in={isLoaded}
            classNames="slide-upper__image-surface"
            timeout={500}
          >
            <div className="slide-upper__image-surface"></div>
          </CSSTransition>
          <img className="slide-upper__image" src={profileImg}></img>
          <div className="noise --upper"></div>
        </div>
        <div className="slide-upper__text-group">
          <CSSTransition
            in={isLoaded}
            classNames="slide-upper__text"
            timeout={1000}
          >
            <p className="slide-upper__text">
              テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
            </p>
          </CSSTransition>
          <CSSTransition
            in={isLoaded}
            classNames="slide-upper__text"
            timeout={1500}
          >
            <p className="slide-upper__text">
              テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
            </p>
          </CSSTransition>
        </div>
      </div>
      <div className="slide-lower">
        <CSSTransition
          in={isLoaded}
          classNames="slide-lower__text"
          timeout={2000}
        >
          <p className="slide-lower__text">
            テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
            テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
          </p>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ProfileSlide;
