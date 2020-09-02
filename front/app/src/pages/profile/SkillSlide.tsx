import React, { useState, useEffect, useRef } from 'react';
import '../../styles/skillSlide.scss';
import Circle from 'react-circle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CSSTransition } from 'react-transition-group';

interface Skill {
  id: number;
  name: string;
  image_url: string;
  background_color: string;
  skill_type_name: string;
}
interface SkillArray {
  skill_type: string;
  skills: Skill[];
}
interface Props {
  isLoaded: boolean;
  skills?: SkillArray[] | undefined;
}

const SkillSlide: React.FC<Props> = (props) => {
  const initialArray: number[] = [];

  useEffect(() => {
    console.log(props.skills);
    if (!props.skills) return;
    props!.skills!.forEach((item) => {
      item.skills.forEach((skill) => {
        percentageArray.push(30);
      });
    });
    percentageArray.forEach(() => {
      initialArray.push(0);
    });
  }, [props.skills]);

  const percentageArray: number[] = [];

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
  }, [props.isLoaded]);

  useEffect(() => {
    const percentageArray: number[] = [];
    if (!props.skills) return;

    props!.skills!.forEach((item) => {
      item.skills.forEach((skill) => {
        percentageArray.push(50);
      });
    });
    const initialArray: number[] = [];
    percentageArray.forEach(() => {
      initialArray.push(0);
    });
    if (props.isLoaded) {
      setTimeout(() => {
        setProgressArray(percentageArray);
      }, 800);
    } else {
      setProgressArray(initialArray);
    }
  }, [props.isLoaded]);

  if (!props.skills) return <div></div>;
  return (
    <div className="slide skill__slide">
      <div className="slide__inner">
        {props!.skills!.map((item, i) => {
          return (
            <CSSTransition
              in={props.isLoaded}
              classNames="section"
              timeout={i * 700}
              key={'section-trans' + i}
            >
              <div className="section" key={'section' + i}>
                <p className="section__skill-type">{item.skill_type}</p>
                <div className="skill-cards__group">
                  {item.skills.map((skill, i) => {
                    return (
                      <div className="skill-card" key={'card' + i}>
                        <div className="skill-card__circle-wrapper">
                          <Circle
                            progress={progressArray[i]}
                            responsive={true}
                            animate={true}
                            animationDuration="1s"
                            lineWidth="30"
                            showPercentage={false}
                            progressColor={skill.background_color}
                            bgColor="whitesmoke"
                          />
                          <img
                            className="skill-card__logo"
                            src={skill.image_url}
                          />
                        </div>
                        <p className="skill-card__title">{skill.name}</p>
                        <p className="skill-card__sub-title"></p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CSSTransition>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSlide;
