import React, { useEffect, useRef, useState } from "react";
import "../styles/progreeBar.scss";

interface Props {
  active_index: number;
}

const ProgreeBar: React.FC<Props> = (props) => {
  const REF = useRef<HTMLDivElement>(null);
  const [currentLeft, setCurrentLeft] = useState(0);
  useEffect(() => {
    const currentDot = REF.current!.children[props.active_index] as HTMLElement;
    setCurrentLeft(currentDot!.offsetLeft);
  }, [props.active_index]);
  return (
    <div className="progress-bar" ref={REF}>
      <span className={"progress-bar__dot --active"}></span>
      <span
        className={
          "progress-bar__dot" + " " + (props.active_index > 0 ? "--active" : "")
        }
      ></span>
      <span
        className={
          "progress-bar__dot" + " " + (props.active_index > 1 ? "--active" : "")
        }
      ></span>
      <span
        className={
          "progress-bar__dot" + " " + (props.active_index > 2 ? "--active" : "")
        }
      ></span>
      <span className="progress-bar__line"></span>
      <span
        className="progress-bar__active-line"
        style={{ width: currentLeft + "px" }}
      ></span>
    </div>
  );
};

export default ProgreeBar;
