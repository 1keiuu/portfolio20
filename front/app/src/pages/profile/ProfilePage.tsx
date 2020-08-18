import React, { useState, useRef } from "react";
import Graph from "./Graph";
import "../../styles/ProfilePage.scss";
import { CSSTransition } from "react-transition-group";
import axios from "../../plugin/axios/index";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProgressBar from "../../components/ProgressBar";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

const Fade = require("react-reveal/Fade");

SwiperCore.use([Mousewheel]);

interface State {
  isGraphOpen: boolean;
}
const GraphBg = (props: any) => {
  if (props.is) {
    return <div className="graph__back-ground">{props.children}</div>;
  } else {
    return <div></div>;
  }
};
const SkillPage: React.FC = () => {
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCount = useSelector((state: RootState) => state.product);
  const getData = async () => {
    const res = await axios.get("/contributions", {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data);
    return res.data.contributions;
  };

  const getCount = async () => {
    // await axios
    //   .get("/contributions", {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    // };
    console.log(currentCount);
  };

  return (
    <div className="profile__inner">
      {/* <div className="profile__card">
        <Fade bottom delay={500}>
          <p>profile</p>
        </Fade>

        <div className="noise"></div>
      </div> */}
      <ProgressBar active_index={currentIndex}></ProgressBar>
      <Swiper
        slidesPerView={1}
        speed={1000}
        centeredSlides={true}
        spaceBetween={60}
        mousewheel={true}
        effect="fade"
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
        }}
      >
        <SwiperSlide>
          <div className="slide profile__slide">profile</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide career__slide">career</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide skill__slide">skill</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide github__slide">github</div>
        </SwiperSlide>
      </Swiper>
    </div>
    // <div>
    //   <CSSTransition
    //     in={isGraphOpen}
    //     classNames="graph__back-ground"
    //     timeout={0}
    //   >
    //     <GraphBg is={isGraphOpen}>
    //         {/* <div className="graph__wrapper">
    //           <Graph contributionsPromise={getData()} />
    //         </div>
    //         <div
    //           className="close__button"
    //           onClick={() => {
    //             setIsGraphOpen(false);
    //           }}
    //         >
    //           Close
    //         </div> */}
    //     </GraphBg>
    //   </CSSTransition>
    //   <div
    //     className="github__button"
    //     onClick={() => {
    //       setIsGraphOpen(true);
    //     }}
    //   ></div>
  );
};

export default SkillPage;
