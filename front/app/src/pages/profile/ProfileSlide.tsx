import React, { useState, useEffect } from 'react';
import '../../styles/profileSlide.scss';
import profileImg from '../../images/me.png';
import { CSSTransition } from 'react-transition-group';

const Fade = require('react-reveal/Fade');

interface Props {
  isLoaded: boolean;
}

const ProfileSlide: React.FC<Props> = (props) => {
  const [isLoadeded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (props.isLoaded) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [props.isLoaded]);

  return (
    <div className="slide profile__slide">
      {/* <div className="slide-upper__image-wrapper">
        <CSSTransition
          in={isLoadeded}
          classNames="slide-upper__image-surface"
          timeout={1000}
        >
          <div className="slide-upper__image-surface">
            <div className="noise --upper"></div>
          </div>
        </CSSTransition>
        <img className="slide-upper__image" src={profileImg}></img>
      </div> */}
      <div className="slide-upper">
        <div className="slide-upper__text-group">
          <CSSTransition
            in={isLoadeded}
            classNames="slide-upper__text"
            timeout={500}
          >
            <p className="slide-upper__text">
              慶應義塾大学経済学部3年の原島一桂です。
            </p>
          </CSSTransition>
          <CSSTransition
            in={isLoadeded}
            classNames="slide-upper__text"
            timeout={1000}
          >
            <p className="slide-upper__text">
              現在は長期インターンできる職場を探しつつ、フリーランスで知り合いの仕事(タイピングゲームの開発)を手伝ったり、個人でもWebアプリの開発をしております。
            </p>
          </CSSTransition>
        </div>
      </div>
      <div className="slide-lower">
        <CSSTransition
          in={isLoadeded}
          classNames="slide-lower__text"
          timeout={1500}
        >
          <p className="slide-lower__text">
            フロントエンドはJavaScript( Vue、React)、サーバーサイドはGO, Ruby,
            Firebase、インフラは AWSを主に使用しております。
          </p>
        </CSSTransition>
        <CSSTransition
          in={isLoadeded}
          classNames="slide-lower__text"
          timeout={1800}
        >
          <p className="slide-lower__text">
            趣味は写真を撮ること、海外旅行、芸術鑑賞、海外サッカー観戦🏴󠁧󠁢󠁥󠁮󠁧󠁿等。
          </p>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ProfileSlide;
