import React, { useState, useRef, useEffect } from 'react';
import '../../styles/ProfilePage.scss';
import axios from '../../plugin/axios/index';
import ProgressBar from '../../components/ProgressBar';
import ProfileSlide from './ProfileSlide';
import CareerSlide from './CareerSlide';
import SkillSlide from './SkillSlide';
import GithubSlide from './GithubSlide';
// router
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import { CSSTransition } from 'react-transition-group';
import Img from '../../images/profile.jpeg';

const Fade = require('react-reveal/Fade');

SwiperCore.use([Mousewheel]);

interface Skill {
  id: number;
  name: string;
  image_url: string;
  background_color: string;
  skill_type_name: string;
  products_count: number;
}
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const SkillPage: React.FC<Props> = (props) => {
  const [contributions, setContributions] = useState<any>();
  const [skills, addSkills] = useState<
    { skill_type: string; skills: Skill[] }[]
  >([]);
  const [isLoaded, setIsLoad] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsLoad(true);

    const fetchData = async () => {
      const res = await axios.get('/contributions', {
        headers: { 'Content-Type': 'application/json' },
      });
      setContributions(res.data);
    };
    const SKILLS_URL = `${process.env.REACT_APP_API_URL}/api/skills`;
    const fetchSkills = async () => {
      await axios.get(SKILLS_URL).then((res) => {
        const skillsArray: { skill_type: string; skills: Skill[] }[] = [];
        const skillTypeArray: string[] = [];
        res.data.skills!.forEach((skill: Skill) => {
          if (!skillTypeArray.includes(skill.skill_type_name)) {
            skillTypeArray.push(skill.skill_type_name);
          }
        });
        skillTypeArray.forEach((skill_type) => {
          skillsArray.push({
            skill_type: skill_type,
            skills: res.data.skills.filter((skill: Skill) => {
              return skill.skill_type_name == skill_type;
            }),
          });
        });
        addSkills(skillsArray);
      });
    };
    fetchData();
    fetchSkills();
  }, []);
  const initSlide = () => {
    const params = props.location.pathname.replace('/profile/', '');
    switch (params) {
      case 'career':
        return 2;
      case 'skill':
        return 3;
      case 'github':
        return 4;
      default:
        return 1;
    }
  };
  const handleChangeSlide = (swiper: { activeIndex: number }) => {
    setCurrentIndex(swiper.activeIndex);
    switch (swiper.activeIndex) {
      case 2:
        window.history.pushState(null, '', '/profile/career');
        break;
      case 3:
        window.history.pushState(null, '', '/profile/skill');
        break;
      case 4:
        window.history.pushState(null, '', '/profile/github');
        break;
      case 1:
        window.history.pushState(null, '', '/profile');
        break;
    }
  };

  return (
    <CSSTransition in={isLoaded} classNames="profile__inner" timeout={0}>
      <div className="profile__inner">
        <ProgressBar active_index={currentIndex}></ProgressBar>
        <Swiper
          slidesPerView={1}
          centeredSlides
          initialSlide={1}
          speed={1500}
          spaceBetween={0}
          mousewheel={true}
          effect="fade"
          onSwiper={(swiper) => {
            swiper.slideTo(initSlide());
          }}
          onReachBeginning={() => {
            // index=0(空)のスライドに到達したらホームへ
            setIsLoad(false);
            setTimeout(() => {
              props.history.push('/');
            }, 500);
          }}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex >= 5) {
              setIsLoad(false);
              setTimeout(() => {
                props.history.push('/product');
              }, 500);
            } else if (swiper.activeIndex <= 0) {
              setIsLoad(false);
              setTimeout(() => {
                props.history.push('/');
              }, 500);
            }
            handleChangeSlide(swiper);
          }}
        >
          <SwiperSlide></SwiperSlide>
          <SwiperSlide>
            <ProfileSlide
              isLoaded={currentIndex === 1 ? true : false}
            ></ProfileSlide>
          </SwiperSlide>
          <SwiperSlide>
            <CareerSlide
              isLoaded={currentIndex === 2 ? true : false}
            ></CareerSlide>
          </SwiperSlide>
          <SwiperSlide>
            <SkillSlide
              isLoaded={currentIndex === 3 ? true : false}
              skills={skills}
            ></SkillSlide>
          </SwiperSlide>
          <SwiperSlide>
            <GithubSlide
              isLoaded={currentIndex === 4 ? true : false}
              contributions={contributions}
            ></GithubSlide>
          </SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
        <img src={Img} className="bg-image" />
      </div>
    </CSSTransition>
  );
};

export default withRouter(SkillPage);
