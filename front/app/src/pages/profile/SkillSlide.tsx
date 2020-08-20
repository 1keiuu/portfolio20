import React, { useState, useEffect, useRef } from "react";
import "../../styles/skillSlide.scss";
import Circle from "react-circle";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSTransition } from "react-transition-group";

interface Props {
  isLoad: boolean;
}

const SkillSlide: React.FC<Props> = (props) => {
  const items = [
    {
      skill_type: "Frontend",
      skills: [
        {
          title: "Vue.js",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/vue.svg",
          project_count: 2,
          percentage: 90,
          color: "#85CB7B",
        },
        {
          title: "React.js",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/react.svg",
          project_count: 2,
          percentage: 75,
          color: "#64E7F8",
        },
        {
          title: "Vue.js",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/vue.svg",
          project_count: 2,
          percentage: 90,
          color: "#85CB7B",
        },
      ],
    },
    {
      skill_type: "Backend",
      skills: [
        {
          title: "Go",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/gopher.svg",
          project_count: 1,
          percentage: 50,
          color: "#51A4C3",
        },
      ],
    },
    {
      skill_type: "Infrastructure",
      skills: [
        {
          title: "AWS",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/aws.svg",
          project_count: 1,
          percentage: 50,
          color: "#51A4C3",
        },
      ],
    },
  ];
  const percentageArray: number[] = [];
  items.forEach((item) => {
    item.skills.forEach((skill) => {
      percentageArray.push(skill.percentage);
    });
  });
  const initialArray: number[] = [];
  percentageArray.forEach(() => {
    initialArray.push(0);
  });

  const [progressArray, setProgressArray] = useState(initialArray);
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

  useEffect(() => {
    const percentageArray: number[] = [];
    items.forEach((item) => {
      item.skills.forEach((skill) => {
        percentageArray.push(skill.percentage);
      });
    });
    const initialArray: number[] = [];
    percentageArray.forEach(() => {
      initialArray.push(0);
    });
    if (props.isLoad) {
      setTimeout(() => {
        setProgressArray(percentageArray);
      }, 800);
    } else {
      setProgressArray(initialArray);
    }
  }, [props.isLoad]);

  return (
    <div className="slide skill__slide">
      {items.map((item, i) => {
        return (
          <CSSTransition
            in={props.isLoad}
            classNames="skill-section"
            timeout={i * 700}
          >
            <div className="skill-section">
              <p className="skill-section__skill-type">{item.skill_type}</p>
              <div className="skill-cards__group">
                {item.skills.map((skill, i) => {
                  return (
                    <div className="skill-card">
                      <div className="skill-card__circle-wrapper">
                        <Circle
                          progress={progressArray[i]}
                          responsive={true}
                          animate={true}
                          animationDuration="1s"
                          lineWidth="30"
                          showPercentage={false}
                          progressColor={skill.color}
                        />
                        <img
                          className="skill-card__logo"
                          src={skill.image_url}
                        />
                      </div>
                      <p className="skill-card__title">{skill.title}</p>
                      <p className="skill-card__sub-title">
                        {skill.project_count +
                          (skill.project_count == 0 ? "Project" : "Projects")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
};

export default SkillSlide;
