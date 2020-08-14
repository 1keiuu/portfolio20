import React from "react";
import axios from "../../plugin/axios/index";

const Fade = require("react-reveal/Fade");

const HOME: React.FC = () => {
  const getData = async () => {
    await axios
      .get("/contributions", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <Fade bottom delay={500}>
      <p>home</p>
      <button
        onClick={async () => {
          await getData();
        }}
      >
        click
      </button>
    </Fade>
  );
};

export default HOME;
