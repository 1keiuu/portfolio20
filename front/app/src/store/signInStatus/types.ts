import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

// *
// * type of Actions
// *
// stateの型
export type SignInStatus = {
  value: boolean;
};

// Actionの型 Actionを継承
interface SetSignInStatusAction extends Action {
  type: typeof ActionTypes.setSignInStatus;
  signInStatus: boolean;
}

interface ResetSignInStatusAction extends Action {
  type: typeof ActionTypes.resetSignInStatus;
}

// exportするActionの型, Unionで結合
export type SignInStatusActionTypes =
  | SetSignInStatusAction
  | ResetSignInStatusAction;
