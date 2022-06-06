import {
  ADD_ITEM_SUBiN_FAIL,
  ADD_ITEM_SUBiN_REQUEST,
  ADD_ITEM_SUBiN_RESET,
  ADD_ITEM_SUBiN_SUCCESS,
  ALL_SUB_INVENTORY_FAIL,
  ALL_SUB_INVENTORY_REQUEST,
  ALL_SUB_INVENTORY_SUCCESS,
  GET_SUB_INVENTORY_FAIL,
  GET_SUB_INVENTORY_REQUEST,
  GET_SUB_INVENTORY_SUCCESS,
} from "../../actions/kitchen/types_subInventory";
import { CLEAR_ERRORS } from "../../actions/types";

//get all the subinventories
export const getInventoriesReducer = (state = { subInventory: {} }, action) => {
  switch (action.type) {
    case ALL_SUB_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case ALL_SUB_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        subInventory: action.payload,
      };
    case ALL_SUB_INVENTORY_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
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

//get all the subinventories
export const getOneInventoryReducer = (
  state = { subInventory: {} },
  action
) => {
  switch (action.type) {
    case GET_SUB_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_SUB_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        subInventory: action.payload,
      };
    case GET_SUB_INVENTORY_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
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

//add kitchen menu reducer - kitchen owner
export const addItemToSubInventory = (state = { subInventory: {} }, action) => {
  switch (action.type) {
    case ADD_ITEM_SUBiN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_ITEM_SUBiN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isadded: true,
        subInventory: action.payload,
      };
    case ADD_ITEM_SUBiN_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isadded: false,
        error: action.payload,
      };
    case ADD_ITEM_SUBiN_RESET:
      return {
        ...state,
        progress: 100,
        isadded: false,
        loading: false,
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
