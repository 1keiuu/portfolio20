import { Action } from "redux";

import { ActionTypes } from "../actionTypes";

// *
// * type of Actions
// *

// stateの型
export type Product = {
  value: any;
};

// Actionの型 Actionを継承
interface AddProductsAction extends Action {
  type: typeof ActionTypes.addProducts; // "INCREMENT"型
  products: any;
}

interface ResetProductsAction extends Action {
  type: typeof ActionTypes.resetProducts;
}

// exportするActionの型, Unionで結合
export type ProductActionTypes = AddProductsAction | ResetProductsAction;
