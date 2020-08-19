import React, { useState, useRef, useEffect } from "react";
import "../../styles/ProfilePage.scss";
import axios from "../../plugin/axios/index";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProgressBar from "../../components/ProgressBar";
import ProfileSlide from "./ProfileSlide";
import CareerSlide from "./CareerSlide";
import SkillSlide from "./SkillSlide";
import GithubSlide from "./GithubSlide";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import { CSSTransition } from "react-transition-group";

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
  const [contributions, setContributions] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCount = useSelector((state: RootState) => state.product);
  const getData = async () => {
    const res = await axios.get("/contributions", {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data);
    setContributions(res.data.contributions);
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
  useEffect(() => {
    setIsLoad(true);
    getData();
  }, []);
  const initSlide = () => {
    const params = window.location.pathname.replace("/profile/", "");
    switch (params) {
      case "career":
        return 1;
      case "skill":
        return 2;
      case "github":
        return 3;
      default:
        return 0;
    }
  };
  const handleChangeSlide = (swiper: { activeIndex: number }) => {
    setCurrentIndex(swiper.activeIndex);
    switch (swiper.activeIndex) {
      case 1:
        window.history.pushState(null, "", "/profile/career");
        break;
      case 2:
        window.history.pushState(null, "", "/profile/skill");
        break;
      case 3:
        window.history.pushState(null, "", "/profile/github");
        break;
      case 0:
        window.history.pushState(null, "", "/profile");
        break;
    }
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
        spaceBetween={60}
        mousewheel={true}
        effect="fade"
        onSwiper={(swiper) => {
          swiper.slideTo(initSlide());
        }}
        onSlideChange={(swiper) => {
          handleChangeSlide(swiper);
        }}
      >
        <SwiperSlide>
          <ProfileSlide
            isLoad={currentIndex == 0 ? true : false}
          ></ProfileSlide>
        </SwiperSlide>
        <SwiperSlide>
          <CareerSlide isLoad={currentIndex == 1 ? true : false}></CareerSlide>
        </SwiperSlide>
        <SwiperSlide>
          <SkillSlide isLoad={currentIndex == 2 ? true : false}></SkillSlide>
        </SwiperSlide>
        <SwiperSlide>
          <GithubSlide contributions={contributions}></GithubSlide>
        </SwiperSlide>
      </Swiper>
      <CSSTransition in={isLoad} classNames="scroll-text__wrapper" timeout={0}>
        {currentIndex < 3 ? (
          <div className="scroll-text__wrapper">
            <p className="scroll-text">SCROLL↓</p>
          </div>
        ) : (
          <div className="scroll-text__wrapper">
            <p className="scroll-text">SCROLL↑</p>
          </div>
        )}
      </CSSTransition>
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
