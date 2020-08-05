import { ActionTypes } from "../actionTypes";
import { CounterActionTypes } from "./types";

// *
// * action creators
// *

export const incrementAction = (): CounterActionTypes => {
  return {
    type: ActionTypes.increment, // "INCREMENT"
  };
};

export const decrementAction = (): CounterActionTypes => {
  return {
    type: ActionTypes.decrement,
  };
};

export const resetAction = (): CounterActionTypes => {
  return {
    type: ActionTypes.countReset,
  };
};
