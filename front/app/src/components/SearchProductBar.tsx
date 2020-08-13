import React, { useState } from "react";
import "../styles/SearchProductBar.scss";
import { CSSTransition } from "react-transition-group";
import CrossIcon from "../components/CrossIcon";
interface Props {
  isOpen: boolean;
  skilltypes: {
    title: string;
    skills: Skill[];
  }[];
}
interface Skill {
  id: number;
  name: string;
  imageURL?: string;
  backgroundColor?: string;
}

const SearchProductBar: React.FC<Props> = (props) => {
  const [selectedArray, setSelectedArray] = useState<Skill[]>([]);
  const addSelectedChip = (skill: Skill) => {
    let newSelectedArray = [
      ...selectedArray,
      {
        id: skill.id,
        name: skill.name,
        backgroundColor: skill.backgroundColor,
      },
    ];
    setSelectedArray(newSelectedArray);
  };
  const deleteSelectedChip = (i: number) => {
    let newSelectedArray = [...selectedArray];
    newSelectedArray.splice(i, 1);
    setSelectedArray(newSelectedArray);
  };
  return (
    <CSSTransition
      in={props.isOpen}
      classNames="search-product__bar"
      timeout={0}
    >
      <div className="search-product__bar">
        <div className="selected-chips">
          {selectedArray.map((skill, i) => {
            return (
              <div
                className="selected-chip"
                key={skill.name + "-chip"}
                style={{ backgroundColor: skill.backgroundColor }}
              >
                <p className="selected-chip__title">{skill.name}</p>
                <div
                  className="selected-chip__icon-wrapper"
                  style={{ backgroundColor: skill.backgroundColor }}
                  onClick={() => {
                    deleteSelectedChip(i);
                  }}
                >
                  <CrossIcon></CrossIcon>
                </div>
              </div>
            );
          })}
        </div>
        <div className="skill-sections__group">
          {props.skilltypes.map((skilltype, i) => {
            return (
              <div className="skill-section" key={"skilltype" + i}>
                <p className="skill-section__title">{skilltype.title}</p>
                <div className="skill-cards">
                  <div className="skill-cards__inner">
                    {skilltype.skills.map((skill) => {
                      return (
                        <div
                          className="skill-card"
                          key={skill.name + "-card"}
                          style={{ backgroundColor: skill.backgroundColor }}
                          onClick={() => {
                            addSelectedChip({
                              id: skill.id,
                              name: skill.name,
                              backgroundColor: skill.backgroundColor,
                            });
                          }}
                        >
                          <div className="skill-card__image-wrapper">
                            <img
                              src={skill.imageURL}
                              className="skill-card__image"
                            ></img>
                          </div>
                          <p className="skill-card__title">{skill.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CSSTransition>
  );
};

export default SearchProductBar;
