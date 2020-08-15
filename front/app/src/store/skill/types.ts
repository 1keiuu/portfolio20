import { Action } from "redux";

import { ActionTypes } from "../actionTypes";

// *
// * type of Actions
// *

// stateの型
export type Skill = {
  value: any;
};

// Actionの型 Actionを継承
interface AddSkillsAction extends Action {
  type: typeof ActionTypes.addSkills; // "INCREMENT"型
  skills: any;
}

interface ResetSkillsAction extends Action {
  type: typeof ActionTypes.resetSkills;
}

// exportするActionの型, Unionで結合
export type SkillActionTypes = AddSkillsAction | ResetSkillsAction;
