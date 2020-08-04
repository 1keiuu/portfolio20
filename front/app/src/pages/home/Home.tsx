import React from "react";
import axios from "axios";

const Fade = require("react-reveal/Fade");
export default class Home extends React.Component {
  getData = async () => {
    const request = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });
    console.log(`${process.env.REACT_APP_API_URL}`);
    await request
      .get("/contributions", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
    // const URL = "/contributions";
    // const res = await axios({
    //   method: "get",
    //   url: "contributions",
    //   baseURL: `${process.env.REACT_APP_API_URL}`,
    //   headers: { "Content-Type": "application/json" },
    // });
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
