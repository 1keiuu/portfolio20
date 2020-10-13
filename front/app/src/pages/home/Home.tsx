import React, { useEffect, lazy,Suspense, useState } from 'react';
import '../../styles/home.scss';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import ArrowPointerIcon from '../../components/ArrowPointerIcon';
const HomeAnimation = lazy(() => import('../../components/HomeAnimation'));

SwiperCore.use([Mousewheel]);

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}
const renderLoader = () => <p>Loading</p>;
const Home: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleWheel = (e: any) => {
    // 縦スクロールイベント
    var current_pos = e.deltaY;
    var start_pos = 0;
    if (current_pos > start_pos) {
      if (current_pos - start_pos <= 0) return;
      setIsLoaded(false);
      setTimeout(() => {
        props.history.push('/profile');
      }, 500);
    }
    start_pos = current_pos;
  };

  useEffect(() => {
    setIsLoaded(true);

    window.addEventListener('wheel', handleWheel);
    const timerId = window.setInterval(() => {
      var child = document.createElement('h3');
      const firstChild = document.getElementById('title__wrapper')
        ?.childNodes[0];
      child.classList.add('home__title');
      child.textContent = "IKKEIPORTFOLIO'20";
      if (firstChild)
        document.getElementById('title__wrapper')?.removeChild(firstChild);
      document.getElementById('title__wrapper')?.appendChild(child);
    }, 10000);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timerId);
    };
  }, []);
  return (
    <div>
      <div>
        <div className="home__title-wrapper" id="title__wrapper">
          <h3 className="home__title">IKKEIPORTFOLIO'20</h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20</h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20</h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20</h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20</h3>
        </div>
        <div></div>
      </div>
      <Swiper
        noSwiping={true}
        mousewheel={true}
        centeredSlides={true}
        centeredSlidesBounds={true}
        preventInteractionOnTransition={true}
        resistance={true}
        onReachEnd={() => {
          props.history.push('/profile');
        }}
        resistanceRatio={1}
      >
        <SwiperSlide>
          <CSSTransition in={isLoaded} timeout={0} classNames="home__inner">
            <div className="home__inner">
            <Suspense fallback={renderLoader()}>
                <HomeAnimation></HomeAnimation>
                </Suspense>
              <div className="scroll-text__wrapper">
                <div className="scroll-text__icon">
                  <ArrowPointerIcon fill="#d7d7d7"></ArrowPointerIcon>
                </div>
                <p className="scroll-text">SCROLL</p>
              </div>
            </div>
          </CSSTransition>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default withRouter(Home);
