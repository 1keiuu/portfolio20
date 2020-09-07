import React, { useEffect, useRef, useState } from 'react';
import '../../styles/home.scss';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import HomeAnimation from '../../components/HomeAnimation';
SwiperCore.use([Mousewheel]);

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

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
    let index = 0;
    const timerId = window.setInterval(() => {
      index += 1;
      var child = document.createElement('h3');
      const first_child = document.getElementById('title__wrapper')
        ?.childNodes[0];
      child.classList.add('home__title');
      child.id = 'title' + index;
      child.textContent = "IKKEIPORTFOLIO'20  ";
      if (first_child)
        document.getElementById('title__wrapper')?.removeChild(first_child);
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
          <h3 className="home__title">IKKEIPORTFOLIO'20 </h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20 </h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20 </h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20 </h3>
          <h3 className="home__title">IKKEIPORTFOLIO'20 </h3>
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
              <div></div>
              <HomeAnimation></HomeAnimation>
            </div>
          </CSSTransition>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default withRouter(Home);
