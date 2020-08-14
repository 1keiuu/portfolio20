import React from "react";
import axios from "../../plugin/axios/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  decrementAction,
  incrementAction,
  resetAction,
} from "../../store/counter/actions";
const Fade = require("react-reveal/Fade");

const HOME: React.FC = () => {
  const currentCount = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  // action を発行する関数
  // 引数にはaction creatorを渡す
  // 親のrenderごとに子のrenderが走るので、useCallbackを用いメモ化すべき。
  const handleIncrement = () => dispatch(incrementAction());
  const handleDecrement = () => dispatch(decrementAction());
  const handleReset = () => dispatch(resetAction());
  const getData = async () => {
    await axios
      .get("/contributions", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });

    console.log(currentCount);
    handleIncrement();
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
