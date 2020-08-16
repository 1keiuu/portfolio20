import React, { useState } from "react";
import "../styles/SearchProductBar.scss";
import { CSSTransition } from "react-transition-group";
import CrossIcon from "../components/CrossIcon";
interface Props {
  isOpen: boolean;
  skills: Skill[];
}

interface Skill {
  id: number;
  name: string;
  image_url: string;
  background_color: string;
  skill_type_name: string;
}

const SearchProductBar: React.FC<Props> = (props) => {
  const [selectedArray, setSelectedArray] = useState<Skill[]>([]);

  const groupBy = <K, V>(
    array: readonly V[],
    getKey: (cur: V, idx: number, src: readonly V[]) => K
  ): [K, V[]][] =>
    Array.from(
      array.reduce((map, cur, idx, src) => {
        const key = getKey(cur, idx, src);
        const list = map.get(key);
        if (list) list.push(cur);
        else map.set(key, [cur]);
        return map;
      }, new Map<K, V[]>())
    );

  // interface Sa extends Skill {
  //   is_selected: boolean;
  // }
  // const S: Sa[] = props.skills.map((skill) => {
  //   const copy = Object.assign(skill);
  //   copy.is_selected = false;
  //   return copy;
  // });
  // console.log(S);
  const skills_array = groupBy(
    props.skills,
    (item) => item.skill_type_name
  ).map(([skill_type_name, items]) => ({
    skill_type_name: skill_type_name,
    skills: items,
  }));

  const addSelectedSkill = (skill: Skill) => {
    let newSelectedArray = [...selectedArray, skill];
    setSelectedArray(newSelectedArray);
    return Promise;
  };
  const removeSelectedSkill = (skill: Skill) => {
    const index = selectedArray.indexOf(skill);
    let newSelectedArray = selectedArray.splice(index, 1);
    setSelectedArray(newSelectedArray);
  };

  const isSelected = (arg: Skill) => {
    return selectedArray.includes(arg);
  };

  // const addSelectedChip = (skill: Skill) => {
  //   let newSelectedArray = [
  //     ...selectedArray,
  //     {
  //       id: skill.id,
  //       name: skill.name,
  //       background_color: skill.background_color,
  //     },
  //   ];
  //   setSelectedArray(newSelectedArray);
  // };
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
        {/* <div className="selected-chips">
          {selectedArray.map((skill, i) => {
            return (
              <div
                className="selected-chip"
                key={skill.name + "-chip"}
                style={{ background_color: skill.background_color }}
              >
                <p className="selected-chip__title">{skill.name}</p>
                <div
                  className="selected-chip__icon-wrapper"
                  style={{ background_color: skill.background_color }}
                  onClick={() => {
                    deleteSelectedChip(i);
                  }}
                >
                  <CrossIcon></CrossIcon>
                </div>
              </div>
            );
          })}
        </div> */}
        <div className="skill-sections__group">
          {skills_array.map((skills_group_by_type, i) => {
            return (
              <div className="skill-section" key={"skill" + i}>
                <p className="skill-section__title">
                  {skills_group_by_type.skill_type_name}
                </p>
                <div className="skill-cards">
                  <div className="skill-cards__inner">
                    {skills_group_by_type.skills.map((skill) => {
                      return (
                        <div
                          className={
                            "skill-card" +
                            " " +
                            (isSelected(skill) ? "--active" : "")
                          }
                          key={skill.name + "-card"}
                          style={
                            isSelected(skill)
                              ? { backgroundColor: skill.background_color }
                              : {}
                          }
                          onClick={() => {
                            console.log(selectedArray);
                            if (!isSelected(skill)) {
                              console.log("add");
                              addSelectedSkill(skill);
                            } else {
                              console.log("remove");
                              removeSelectedSkill(skill);
                            }

                            console.log(selectedArray);
                            // addSelectedChip({
                            //   id: skill.id,
                            //   name: skill.skill_name,
                            //   background_color: skill.background_color,
                            // });
                          }}
                        >
                          <div className="skill-card__image-wrapper">
                            <img
                              src={skill.image_url}
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
