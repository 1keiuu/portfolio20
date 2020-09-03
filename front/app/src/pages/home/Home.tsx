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
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
  return (
    <Swiper
      noSwiping={true}
      mousewheel={true}
      centeredSlides={true}
      centeredSlidesBounds={true}
      preventInteractionOnTransition={true}
      resistance={true}
      resistanceRatio={1}
    >
      <SwiperSlide>
        <CSSTransition in={isLoaded} timeout={0} classNames="home__inner">
          <div className="home__inner">
            <p>home</p>
          </div>
        </CSSTransition>
      </SwiperSlide>
    </Swiper>
  );
};

export default withRouter(Home);
