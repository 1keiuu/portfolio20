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

const SkillPage: React.FC = () => {
  const [contributions, setContributions] = useState<any>({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [isLoaded, setIsLoad] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsLoad(true);
    const fetchData = async () => {
      const res = await axios.get("/contributions", {
        headers: { "Content-Type": "application/json" },
      });
      setContributions(res.data);
      console.log(res.data);
    };

    fetchData();
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
            isLoaded={currentIndex === 0 ? true : false}
          ></ProfileSlide>
        </SwiperSlide>
        <SwiperSlide>
          <CareerSlide
            isLoaded={currentIndex === 1 ? true : false}
          ></CareerSlide>
        </SwiperSlide>
        <SwiperSlide>
          <SkillSlide isLoaded={currentIndex === 2 ? true : false}></SkillSlide>
        </SwiperSlide>
        <SwiperSlide>
          <GithubSlide
            isLoaded={currentIndex === 3 ? true : false}
            contributions={contributions}
          ></GithubSlide>
        </SwiperSlide>
      </Swiper>
      <CSSTransition
        in={isLoaded}
        classNames="scroll-text__wrapper"
        timeout={0}
      >
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
  );
};

export default SkillPage;
