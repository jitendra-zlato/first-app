import {
  ADD_KITCHEN_FAIL,
  ADD_KITCHEN_REQUEST,
  ADD_KITCHEN_RESET,
  ADD_KITCHEN_SUCCESS,
  DELETE_KITCHEN_FAIL,
  DELETE_KITCHEN_REQUEST,
  DELETE_KITCHEN_RESET,
  DELETE_KITCHEN_SUCCESS,
  GET_ALL_KITCHEN_FAIL,
  GET_ALL_KITCHEN_REQUEST,
  GET_ALL_KITCHEN_SUCCESS,
  GET_KITCHEN_FAIL,
  GET_KITCHEN_REQUEST,
  GET_KITCHEN_SUCCESS,
  UPDATE_KITCHEN_FAIL,
  UPDATE_KITCHEN_REQUEST,
  UPDATE_KITCHEN_RESET,
  UPDATE_KITCHEN_SUCCESS,
} from "../../actions/kitchen/typesKitchen";
import { CLEAR_ERRORS } from "../../actions/types";

//add kitchen - kitchen owner
export const addKitchenReducer = (state = { addKitchen: {} }, action) => {
  switch (action.type) {
    case ADD_KITCHEN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_KITCHEN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        addKitchen: action.payload,
        isadded: true,
      };
    case ADD_KITCHEN_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case ADD_KITCHEN_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        addKitchen: null,
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

//get all kitchen - kitchen owner
export const getAllKitchensReducer = (state = { allKitchens: [] }, action) => {
  switch (action.type) {
    case GET_ALL_KITCHEN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_ALL_KITCHEN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        allKitchens: action.payload,
      };
    case GET_ALL_KITCHEN_FAIL:
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

//get one kitchen - kitchen owner
export const getKitchenReducer = (state = { kitchen: {} }, action) => {
  switch (action.type) {
    case GET_KITCHEN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_KITCHEN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        kitchen: action.payload,
      };
    case GET_KITCHEN_FAIL:
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

//update kitchen - kitchen owner
export const updateKitchenReducer = (state = { kitchen: {} }, action) => {
  switch (action.type) {
    case UPDATE_KITCHEN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isupdated: false,
      };
    case UPDATE_KITCHEN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        kitchen: action.payload,
        isupdated: true,
      };
    case UPDATE_KITCHEN_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isupdated: false,
        error: action.payload,
      };
    case UPDATE_KITCHEN_RESET:
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

//update kitchen - kitchen owner
export const deleteKitchenReducer = (state = { kitchen: {} }, action) => {
  switch (action.type) {
    case DELETE_KITCHEN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isdeleted: false,
      };
    case DELETE_KITCHEN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        kitchen: action.payload,
        isdeleted: true,
      };
    case DELETE_KITCHEN_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isdeleted: false,
      };
    case DELETE_KITCHEN_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
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
