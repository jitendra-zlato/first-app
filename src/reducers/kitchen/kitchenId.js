import {
  GET_KITCHEN_ID_REQUEST,
  GET_KITCHEN_ID_SUCCESS,
  SET_KITCHEN_ID_REQUEST,
  SET_KITCHEN_ID_SUCCESS,
} from "../../actions/kitchen/typesKitchen";
import { CLEAR_ERRORS } from "../../actions/types";

//set kitchen id
export const setKitchenIdReducer = (state = { kitchenId: {} }, action) => {
  switch (action.type) {
    case SET_KITCHEN_ID_REQUEST:
      return {
        ...state,
      };
    case SET_KITCHEN_ID_SUCCESS:
      return {
        ...state,
        kitchenId: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//get kitchen id
export const getKitchenIdReducer = (state = { kitchenId: {} }, action) => {
  switch (action.type) {
    case GET_KITCHEN_ID_REQUEST:
      return {
        ...state,
      };
    case GET_KITCHEN_ID_SUCCESS:
      return {
        ...state,
        kitchenId: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
