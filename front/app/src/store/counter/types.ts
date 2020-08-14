import { Action } from "redux";

import { ActionTypes } from "../actionTypes";

// *
// * type of Actions
// *

// stateの型
export type Count = {
  value: any;
};

// Actionの型 Actionを継承
interface IncrementAction extends Action {
  type: typeof ActionTypes.increment; // "INCREMENT"型
  products: any;
}

interface DecrementAction extends Action {
  type: typeof ActionTypes.decrement;
}

interface ResetAction extends Action {
  type: typeof ActionTypes.countReset;
}

// exportするActionの型, Unionで結合
export type CounterActionTypes =
  | IncrementAction
  | DecrementAction
  | ResetAction;
