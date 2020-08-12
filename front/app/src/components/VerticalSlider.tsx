import React, { useRef, useEffect, useState, useCallback } from "react";
import "../styles/verticalSlider.scss";

const VerticalSlider: React.FC = (props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [Hoge, setHoge] = useState(false);
  let scrollStatus: boolean = false;
  let lastScrollTop: number = 0;
  let index: number = 0;
  let isFirst: boolean = true;
  const handleScroll = (current: number) => {
    // console.log(lastScrollTop, current);

    if (!innerRef.current || !scrollRef.current) return;

    scrollStatus = true;
    // console.log(lastScrollTop, current);

    if (current > lastScrollTop) {
      if (index >= innerRef.current.children.length - 1) return;
      //   console.log("up");
      index++;
      console.log(index);
      const height = window
        .getComputedStyle(innerRef.current.children[0])
        .getPropertyValue("height")
        .replace("px", "");
      let top = innerRef.current.style.top;
      top = Number(top.replace("px", "")) - Number(height) + "px";
      console.log(top);
      innerRef.current.style.top = top;
      //   const of = (innerRef.current.children[index] as HTMLInputElement)
      //     .offsetTop;
      //   scrollRef.current.scrollTo({ top: of, behavior: "smooth" });
    } else {
      if (index <= 0) return;
      //   console.log("down");
      index--;
      console.log(index);
      const height = window
        .getComputedStyle(innerRef.current.children[0])
        .getPropertyValue("height")
        .replace("px", "");
      let top = innerRef.current.style.top;
      top = Number(top.replace("px", "")) + Number(height) + "px";
      console.log(top);
      innerRef.current.style.top = top;
      // console.log(top);
      //   scrollRef.current.scrollTo({ top: of, behavior: "smooth" });
    }

    lastScrollTop = current;
    setTimeout(() => {
      scrollStatus = false;
    }, 2000);
  };
  let timeoutId: any;
  useEffect(() => {
    // if (!scrollRef.current) return;
    // scrollRef.current.addEventListener("scroll", (e) => {
    //   console.log("D" + scrollStatus);
    //   if (scrollStatus) return;
    //   const scrollTop = (e.target as HTMLInputElement).scrollTop;
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(function () {
    //     handleScroll(scrollTop);
    //   }, 500);
    // });
    // return () => {
    //   if (!scrollRef.current) return;
    //   scrollRef.current.removeEventListener(
    //     "scroll",
    //     (e) => {
    //       const scrollTop = (e.target as HTMLInputElement).scrollTop;
    //       handleScroll(scrollTop);
    //     },
    //     true
    //   );
    // };
  });

  return (
    <div className="vertical-slider" ref={scrollRef}>
      <div className="vertical-slider__inner" ref={innerRef}>
        {props.children}
      </div>
    </div>
  );
};

export default VerticalSlider;
