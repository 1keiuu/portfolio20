import React, { useEffect } from "react";
import axios from "../../plugin/axios/index";
import "../../styles/home.scss";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

import * as H from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";

SwiperCore.use([Mousewheel]);
const Fade = require("react-reveal/Fade");

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const HOME: React.FC<Props> = (props) => {
  const getData = async () => {
    await axios
      .get("/contributions", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const handleWheel = (e: any) => {
    // 縦スクロールイベント
    var current_pos = e.deltaY;
    var start_pos = 0;
    if (current_pos > start_pos) {
      if (current_pos - start_pos > 0) props.history.push("/profile");
    }
    start_pos = current_pos;
  };
  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <Fade bottom delay={500}>
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
          <div className="home__inner">
            <p>home</p>
            <button
              onClick={async () => {
                await getData();
              }}
            >
              click
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </Fade>
  );
};

export default withRouter(HOME);
