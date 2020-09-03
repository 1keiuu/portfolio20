import React, { useState, useEffect, useRef } from 'react';
import '../../styles/skillSlide.scss';
import Circle from 'react-circle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CSSTransition } from 'react-transition-group';
import { resetProductsAction } from '../../store/product/actions';

interface Skill {
  id: number;
  name: string;
  image_url: string;
  background_color: string;
  skill_type_name: string;
  products_count: number;
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
  // const initialArray: number[] = [];

  // useEffect(() => {
  //   console.log(props);
  //   if (!props.skills) return;
  //   props!.skills!.forEach((item) => {
  //     item.skills.forEach((skill) => {
  //       percentageArray.push(30);
  //     });
  //   });
  //   percentageArray.forEach(() => {
  //     initialArray.push(0);
  //   });
  // }, [props.skills]);

  // const percentageArray: number[] = [];

  // const [progressArray, setProgressArray] = useState(initialArray);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // timerがなければアニメーション(CSSTransitionのin)がうまく作用しない
      setIsLoaded(props.isLoaded);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.isLoaded]);

  return (
    <div className="slide skill__slide">
      <div className="slide__inner">
        {props!.skills!.map((item, i) => {
          return (
            <CSSTransition
              in={isLoaded}
              classNames="section"
              timeout={i * 500}
              key={'section-trans' + i}
            >
              <div className="section" key={'section' + i}>
                <p className="section__skill-type">{item.skill_type}</p>
                <div className="skill-cards__group">
                  {item.skills.map((skill, i) => {
                    return (
                      <div className="skill-card" key={'card' + i}>
                        {/* <Circle
                            progress={progressArray[i]}
                            responsive={true}
                            animate={true}
                            animationDuration="1s"
                            lineWidth="30"
                            showPercentage={false}
                            progressColor={skill.background_color}
                            bgColor="whitesmoke"
                          /> */}
                        <div
                          className="skill-card__logo-wrapper"
                          style={{ backgroundColor: skill.background_color }}
                        >
                          <img
                            className="skill-card__logo"
                            src={skill.image_url}
                          />
                        </div>
                        <div className="skill-card__title-wrapper">
                          <p className="skill-card__title">{skill.name}</p>
                          <p className="skill-card__sub-title">
                            {skill.products_count} Projects
                          </p>
                        </div>
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
