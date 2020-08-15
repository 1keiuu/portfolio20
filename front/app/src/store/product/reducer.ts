import { ActionTypes } from "../actionTypes";
import { Product, ProductActionTypes } from "./types";

// *
// * reducer
// *

const initialState: Product = {
  value: [],
};

export const productReducer = (
  state = initialState,
  action: ProductActionTypes
): Product => {
  switch (action.type) {
    case ActionTypes.addProducts: // action.type === "ADD_PRODUCTS"
      return { value: action.products };
    case ActionTypes.resetProducts:
      return { value: [] };
    default:
      return state;
  }
};
