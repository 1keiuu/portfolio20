// *
// * action types
// * 一意となるキーを指定するので、Actionが増えるたびにここにキーを書く
// *

export const ActionTypes = {
  addProducts: 'ADD_PRODUCTS',
  resetProducts: 'RESET_PRODUCTS',
  addSkills: 'ADD_SKILLS',
  resetSkills: 'RESET_SKILLS',
  setSignInStatus: 'SET_SIGNIN',
  resetSignInStatus: 'RESET_SIGNIN',
} as const;
