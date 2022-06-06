import {
  ADD_ITEM_TO_MENU_FAIL,
  ADD_ITEM_TO_MENU_REQUEST,
  ADD_ITEM_TO_MENU_RESET,
  ADD_ITEM_TO_MENU_SUCCESS,
  ADD_MENU_FAIL,
  ADD_MENU_REQUEST,
  ADD_MENU_RESET,
  ADD_MENU_SUCCESS,
  DELETE_MENU_ITEM_FAIL,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_RESET,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_FAIL,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  UPDATE_MENU_ITEM_FAIL,
  UPDATE_MENU_ITEM_REQUEST,
  UPDATE_MENU_ITEM_RESET,
  UPDATE_MENU_ITEM_SUCCESS,
} from "../../actions/kitchen/typesMenu";
import { CLEAR_ERRORS } from "../../actions/types";

//add kitchen menu reducer - kitchen owner
export const addKitcheMenuReducer = (state = { menu: {} }, action) => {
  switch (action.type) {
    case ADD_MENU_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_MENU_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isadded: true,
        menu: action.payload,
      };
    case ADD_MENU_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isadded: false,
        error: action.payload,
      };
    case ADD_MENU_RESET:
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

//add kitchen menu item reducer - kitchen owner
export const addKitcheMenuItemReducer = (state = { menuItem: {} }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_MENU_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isAdded: false,
      };
    case ADD_ITEM_TO_MENU_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAdded: true,
        menuItem: action.payload,
      };
    case ADD_ITEM_TO_MENU_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAdded: false,
        error: action.payload,
      };
    case ADD_ITEM_TO_MENU_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAdded: false,
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

//get all kitchen - kitchen owner
export const getKitchenMenuReducer = (state = { kitchenMenu: [] }, action) => {
  switch (action.type) {
    case GET_MENU_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_MENU_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        kitchenMenu: action.payload,
      };
    case GET_MENU_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        kitchenMenu: null,
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

//delete kitchen menu item - kitchen owner
export const deleteKitchenMenuItemReducer = (state = { menu: [] }, action) => {
  switch (action.type) {
    case DELETE_MENU_ITEM_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isdeleted: false,
      };
    case DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isdeleted: true,
        menu: action.payload,
      };
    case DELETE_MENU_ITEM_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isdeleted: false,
        error: action.payload,
      };
    case DELETE_MENU_ITEM_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        isdeleted: false,
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

//update kitchen - kitchen owner
export const updateKitchenMenuItemReducer = (
  state = { menuItem: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_MENU_ITEM_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isupdated: false,
      };
    case UPDATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isupdated: true,
        menuItem: action.payload,
      };
    case UPDATE_MENU_ITEM_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isupdated: false,
        error: action.payload,
      };
    case UPDATE_MENU_ITEM_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
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
