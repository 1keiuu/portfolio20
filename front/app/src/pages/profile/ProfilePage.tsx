import React, { useState } from "react";
import Graph from "./Graph";
import "../../styles/ProfilePage.scss";
import { CSSTransition } from "react-transition-group";
import axios from "../../plugin/axios/index";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Fade = require("react-reveal/Fade");

interface State {
  isGraphOpen: boolean;
}
const GraphBg = (props: any) => {
  if (props.is) {
    return <div className="graph__back-ground">{props.children}</div>;
  } else {
    return <div></div>;
  }
};
const SkillPage: React.FC = () => {
  const [isGraphOpen, setIsGraphOpen] = useState(false);

  const currentCount = useSelector((state: RootState) => state.counter);

  const getData = async () => {
    const res = await axios.get("/contributions", {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data);
    return res.data.contributions;
  };

  const getCount = async () => {
    // await axios
    //   .get("/contributions", {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    // };
    console.log(currentCount);
  };

  return (
    <Fade bottom delay={1000}>
      <p>Profile</p>
    </Fade>
    // <div>
    //   <CSSTransition
    //     in={isGraphOpen}
    //     classNames="graph__back-ground"
    //     timeout={0}
    //   >
    //     <GraphBg is={isGraphOpen}>
    //         {/* <div className="graph__wrapper">
    //           <Graph contributionsPromise={getData()} />
    //         </div>
    //         <div
    //           className="close__button"
    //           onClick={() => {
    //             setIsGraphOpen(false);
    //           }}
    //         >
    //           Close
    //         </div> */}
    //     </GraphBg>
    //   </CSSTransition>
    //   <div
    //     className="github__button"
    //     onClick={() => {
    //       setIsGraphOpen(true);
    //     }}
    //   ></div>
  );
};

export default SkillPage;
