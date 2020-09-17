import { combineReducers, createStore } from 'redux';

import { productReducer } from './product/reducer';
import { skillReducer } from './skill/reducer';
import { signInStatusReducer } from './signInStatus/reducer';
// *
// * store 本体
// *

// Reducerを増やすときは、ここに追加
const rootReducer = combineReducers({
  product: productReducer,
  skill: skillReducer,
  signInStatus: signInStatusReducer,
});

// states type
export type RootState = ReturnType<typeof rootReducer>; // ReturnType<typeof fn>は、fnの返り値の型

// store
const store = createStore(rootReducer);

export default store;
