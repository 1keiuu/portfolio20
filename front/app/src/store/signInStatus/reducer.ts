import { ActionTypes } from '../actionTypes';
import { SignInStatus, SignInStatusActionTypes } from './types';

// *
// * reducer
// *

const initialState: SignInStatus = {
  value: false,
};

const signInStatusReducer = (
  state = initialState,
  action: SignInStatusActionTypes
): SignInStatus => {
  switch (action.type) {
    case ActionTypes.setSignInStatus:
      return { value: action.signInStatus };
    case ActionTypes.resetSignInStatus:
      return { value: false };
    default:
      return state;
  }
};

export default signInStatusReducer;
