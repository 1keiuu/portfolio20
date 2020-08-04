import React from "react";
import axios from "../../plugin/axios/index";

const Fade = require("react-reveal/Fade");
export default class Home extends React.Component {
  getData = async () => {
    await axios
      .get("/contributions", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <Fade bottom>
        <p>home</p>
        <button
          onClick={async () => {
            await this.getData();
          }}
        >
          click
        </button>
      </Fade>
    );
  }
}
