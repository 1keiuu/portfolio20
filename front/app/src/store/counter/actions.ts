import { ActionTypes } from "../actionTypes";
import { CounterActionTypes } from "./types";

// *
// * action creators
// *

export const incrementAction = (products: any): CounterActionTypes => {
  return {
    type: ActionTypes.increment, // "INCREMENT"
    products: products,
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
