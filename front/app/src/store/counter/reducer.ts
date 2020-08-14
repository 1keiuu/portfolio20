import { ActionTypes } from "../actionTypes";
import { Count, CounterActionTypes } from "./types";

// *
// * reducer
// *

const initialState: Count = {
  value: [],
};

export const countReducer = (
  state = initialState,
  action: CounterActionTypes
): Count => {
  switch (action.type) {
    case ActionTypes.increment: // action.type === "INCREMENT"
      return { value: action.products }; // value に1足す
    case ActionTypes.decrement:
    // 0以下にはならない
    // return { value: state.value === 0 ? 0 : state.value - 1 };
    case ActionTypes.countReset:
    // return { value: 0 };
    default:
      // const _: never = action;
      return state;
  }
};
