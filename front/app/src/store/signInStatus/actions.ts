import { ActionTypes } from '../actionTypes';
import { SignInStatusActionTypes } from './types';

// *
// * action creators
// *

export const setSignInStatusAction = (
  isSignIn: boolean
): SignInStatusActionTypes => {
  return {
    type: ActionTypes.setSignInStatus,
    signInStatus: isSignIn,
  };
};

export const resetSignInStatussAction = (): SignInStatusActionTypes => {
  return {
    type: ActionTypes.resetSignInStatus,
  };
};
