import { ActionTypes } from "../actionTypes";
import { ProductActionTypes } from "./types";

// *
// * action creators
// *

export const addProductsAction = (products: any): ProductActionTypes => {
  return {
    type: ActionTypes.addProducts,
    products: products,
  };
};

export const resetProductsAction = (): ProductActionTypes => {
  return {
    type: ActionTypes.resetProducts,
  };
};
