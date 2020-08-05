import { combineReducers, createStore } from "redux";

import { countReducer } from "./counter/reducer";

// *
// * store 本体
// *

// Reducerを増やすときは、ここに追加
const rootReducer = combineReducers({
  counter: countReducer,
});

// states type
export type RootState = ReturnType<typeof rootReducer>; // ReturnType<typeof fn>は、fnの返り値の型

// store
const store = createStore(rootReducer);

export default store;
