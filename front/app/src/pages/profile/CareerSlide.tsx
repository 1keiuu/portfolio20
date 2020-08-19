import React, { useState, useEffect, useRef } from "react";
import "../../styles/careerSlide.scss";
import { CSSTransition } from "react-transition-group";

interface Props {
  isLoad: boolean;
}

const CareerSlide: React.FC<Props> = (props) => {
  const timeline = [
    {
      title: "2016.3 日本大学第二高校卒業",
    },
    {
      title: "2017.4 慶應義塾大学 経済学部入学",
    },
    {
      title: "2018.5 株式会社Seven garden インターン開始",
      list: ["- ゲストハウスの立ち上げ"],
    },
    {
      title: "2019.2 株式会社カイエン インターン開始",
      list: ["- コーディング", "- ワイヤーフレーム設計"],
    },
    {
      title: "2020.2 株式会社Parchie インターン開始",
      list: ["- Vue×Railsを使ったECサイトの開発/運営"],
    },
  ];
  const [status, setStatus] = useState(false);
  const isFirstRender = useRef(false);
  useEffect(() => {
    if (isFirstRender.current) {
      if (status) {
        setStatus(false);
      } else {
        setStatus(true);
      }
    }
    isFirstRender.current = true;
  }, [props.isLoad]);

  return (
    <div className="slide career__slide">
      <p>CAREER</p>
      <div className="timeline">
        <span className="timeline__left-line"></span>
        {timeline.map((item, i) => {
          return (
            <CSSTransition
              in={status}
              classNames="timeline__item"
              timeout={500 * i}
            >
              <div className="timeline__item">
                <span className="item__dot-wrapper ">
                  <span className="item__dot"></span>
                </span>
                <div className="item__text-wrapper">
                  <p className="item__text">{item.title}</p>
                  <div className="item__text-list">
                    {item.list?.map((listItem) => {
                      return <p>{listItem}</p>;
                    })}
                  </div>
                </div>
              </div>
            </CSSTransition>
          );
        })}
      </div>
    </div>
  );
};

export default CareerSlide;
