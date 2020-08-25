import React from "react";
import axios from "../../plugin/axios/index";
import Layout from "../../components/Layout";
import { BrowserRouter as Router, RouteComponentProps } from "react-router-dom";

const Fade = require("react-reveal/Fade");

type Props = {} & RouteComponentProps<{ mode: string }>;

const HOME: React.FC<Props> = (props) => {
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
    <Layout current_page={props.match.params.mode}>
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
    </Layout>
  );
};

export default HOME;
