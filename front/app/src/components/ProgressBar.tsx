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
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndex = usePrevious(activeIndex);

  useEffect(() => {
    const currentDot = REF.current!.children[props.active_index] as HTMLElement;
    setCurrentLeft(currentDot!.offsetLeft);
    if (props.active_index > prevIndex!) {
      // バーが戻る時は遅らせたくない
      setTimeout(() => {
        setActiveIndex(props.active_index);
      }, 900);
    } else {
      setActiveIndex(props.active_index);
    }
  }, [props.active_index]);
  return (
    <div className="progress-bar" ref={REF}>
      <div className="dot__wrapper">
        <p className={activeIndex > -1 ? "--active" : ""}>Profile</p>
        <span
          className={"dot__border" + " " + (activeIndex > -1 ? "--active" : "")}
        >
          <span
            className={"dot" + " " + (activeIndex > -1 ? "--active" : "")}
          ></span>
        </span>
      </div>

      <div className="dot__wrapper">
        <p className={activeIndex > 0 ? "--active" : ""}>Career</p>
        <span
          className={"dot__border" + " " + (activeIndex > 0 ? "--active" : "")}
        >
          <span
            className={"dot" + " " + (activeIndex > 0 ? "--active" : "")}
          ></span>
        </span>
      </div>

      <div className="dot__wrapper">
        <p className={activeIndex > 1 ? "--active" : ""}>Skill</p>
        <span
          className={"dot__border" + " " + (activeIndex > 1 ? "--active" : "")}
        >
          <span
            className={"dot" + " " + (activeIndex > 1 ? "--active" : "")}
          ></span>
        </span>
      </div>

      <div className="dot__wrapper">
        <p className={activeIndex > 2 ? "--active" : ""}>Github</p>
        <span
          className={"dot__border" + " " + (activeIndex > 2 ? "--active" : "")}
        >
          <span
            className={"dot" + " " + (activeIndex > 2 ? "--active" : "")}
          ></span>
        </span>
      </div>

      <span className="progress-bar__line"></span>
      <span
        className="progress-bar__active-line"
        style={{ width: currentLeft + "px" }}
      ></span>
    </div>
  );
};

export default ProgreeBar;
