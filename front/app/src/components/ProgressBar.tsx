import React, { useEffect, useRef, useState } from "react";
import "../styles/progreeBar.scss";

interface Props {
  active_index: number;
}
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ProgreeBar: React.FC<Props> = (props) => {
  const REF = useRef<HTMLDivElement>(null);
  const [currentLeft, setCurrentLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const prevIndex = usePrevious(activeIndex);

  useEffect(() => {
    const currentDot = REF.current!.children[props.active_index] as HTMLElement;
    setCurrentLeft(currentDot!.offsetLeft);
    if (props.active_index > prevIndex!) {
      // バーが戻る時は遅らせたくない
      if (prevIndex) {
        if (prevIndex! < 0) return setActiveIndex(props.active_index);
      }
      setTimeout(() => {
        setActiveIndex(props.active_index);
      }, 900);
    } else {
      setActiveIndex(props.active_index);
    }
  }, [props.active_index]);

  const slideArray = [
    {
      title: "Profile",
    },
    {
      title: "Career",
    },
    {
      title: "SkillSet",
    },
    {
      title: "Github",
    },
  ];
  return (
    <div className="progress-bar" ref={REF}>
      {slideArray.map((slide, i) => {
        return (
          <div className="dot__wrapper">
            <p className={activeIndex >= i ? "--active" : ""}>{slide.title}</p>
            <span
              className={
                "dot__border" + " " + (activeIndex >= i ? "--active" : "")
              }
            >
              <span
                className={"dot" + " " + (activeIndex >= i ? "--active" : "")}
              ></span>
            </span>
          </div>
        );
      })}

      <span className="progress-bar__line"></span>
      <span
        className="progress-bar__active-line"
        style={{ width: currentLeft + "px" }}
      ></span>
    </div>
  );
};

export default ProgreeBar;
