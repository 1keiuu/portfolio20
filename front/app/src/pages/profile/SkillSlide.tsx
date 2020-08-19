import React, { useState, useEffect } from "react";
import "../../styles/skillSlide.scss";
import Circle from "react-circle";

const SkillSlide: React.FC = () => {
  const items = [
    {
      skill_type: "Frontend",
      skills: [
        {
          title: "Vue.js",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/vue.svg",
          count: 2,
          percentage: 90,
          color: "#85CB7B",
        },
        {
          title: "React.js",
          image_url:
            "https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/skills/react.svg",
          count: 2,
          percentage: 75,
          color: "#64E7F8",
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
          count: 2,
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
  useEffect(() => {
    const percentageArray: number[] = [];
    items.forEach((item) => {
      item.skills.forEach((skill) => {
        percentageArray.push(skill.percentage);
      });
    });

    setTimeout(() => {
      setProgressArray(percentageArray);
    }, 1000);
  }, []);

  return (
    <div className="slide skill__slide">
      {items.map((item) => {
        return (
          <div className="skill-section">
            <p>{item.skill_type}</p>
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
                      <img className="skill-card__logo" src={skill.image_url} />
                    </div>
                    <p>{skill.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillSlide;
