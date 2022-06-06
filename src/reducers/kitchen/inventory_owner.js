import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_RESET,
  ADD_ITEM_SUCCESS,
  CREATE_INVENTORY_FAIL,
  CREATE_INVENTORY_REQUEST,
  CREATE_INVENTORY_RESET,
  CREATE_INVENTORY_SUCCESS,
  GET_KITCHEN_INVENTORY_FAIL,
  GET_KITCHEN_INVENTORY_REQUEST,
  GET_KITCHEN_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_RESET,
  UPDATE_INVENTORY_SUCCESS,
} from "../../actions/kitchen/types-inventory";
import { CLEAR_ERRORS } from "../../actions/types";

//create inventory
export const createInventoryReducer = (state = { inventory: {} }, action) => {
  switch (action.type) {
    case CREATE_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        iscreated: false,
      };
    case CREATE_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        inventory: action.payload,
        iscreated: true,
      };
    case CREATE_INVENTORY_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        iscreated: false,
      };
    case CREATE_INVENTORY_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        inventory: null,
        iscreated: false,
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

//add item to inventory reducer
export const addItemToInventoryReducer = (
  state = { inventory: {} },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        inventory: action.payload,
        isadded: true,
      };
    case ADD_ITEM_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case ADD_ITEM_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        inventory: null,
        isadded: false,
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

//get inventory
export const getOwnerInventoryReducer = (state = { inventory: [] }, action) => {
  switch (action.type) {
    case GET_KITCHEN_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_KITCHEN_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        inventory: action.payload,
      };
    case GET_KITCHEN_INVENTORY_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        inventory:[],
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

//get orders
export const updateItemFromInventoryReducer = (
  state = { inventory: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isupdated: false,
      };
    case UPDATE_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        inventory: action.payload,
        isupdated: true,
      };
    case UPDATE_INVENTORY_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isupdated: false,
      };
    case UPDATE_INVENTORY_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        inventory: null,
        isupdated: false,
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
