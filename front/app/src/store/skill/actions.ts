import { ActionTypes } from '../actionTypes';
import { SkillActionTypes } from './types';

// *
// * action creators
// *

export const addSkillsAction = (skills: any): SkillActionTypes => {
  return {
    type: ActionTypes.addSkills,
    skills: skills,
  };
};

export const resetSkillsAction = (): SkillActionTypes => {
  return {
    type: ActionTypes.resetSkills,
  };
};
