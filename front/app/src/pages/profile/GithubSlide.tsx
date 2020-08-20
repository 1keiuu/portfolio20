import React, { useEffect } from "react";
import "../../styles/githubSlide.scss";
import Graph from "./Graph";

interface Props {
  contributions: any;
}
const GithubSlide: React.FC<Props> = (props) => {
  useEffect(() => {
    console.log(props.contributions);
  }, []);
  return (
    <div className="slide github__slide">
      <div className="slide__inner">
        <Graph contributionsPromise={props.contributions}></Graph>
      </div>
    </div>
  );
};

export default GithubSlide;
