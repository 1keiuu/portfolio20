import { ActionTypes } from '../actionTypes';
import { Skill, SkillActionTypes } from './types';

// *
// * reducer
// *

const initialState: Skill = {
  value: [],
};

const skillReducer = (
  state = initialState,
  action: SkillActionTypes
): Skill => {
  switch (action.type) {
    case ActionTypes.addSkills: // action.type === "ADD_PRODUCTS"
      return { value: action.skills };
    case ActionTypes.resetSkills:
      return { value: [] };
    default:
      return state;
  }
};

export default skillReducer;
