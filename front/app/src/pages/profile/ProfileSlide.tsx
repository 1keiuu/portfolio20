import React, { useState, useEffect } from "react";
import "../../styles/profileSlide.scss";
import profileImg from "../../images/profile.jpeg";
import { CSSTransition } from "react-transition-group";
const Fade = require("react-reveal/Fade");

const ProfileSlide: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
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
          <p>
            テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
          </p>
          <p>
            テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
          </p>
        </div>
      </div>
      <div className="slide-lower">
        <p>
          テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
          テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
        </p>
      </div>
    </div>
  );
};

export default ProfileSlide;
