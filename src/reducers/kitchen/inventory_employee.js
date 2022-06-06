import {
  CHANGE_ORDER_STATUS_FAIL,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_RESET,
  CHANGE_ORDER_STATUS_SUCCESS,
  GET_INVENTORY_FAIL,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  REPORT_LOST_INVENTORY_FAIL,
  REPORT_LOST_INVENTORY_REQUEST,
  REPORT_LOST_INVENTORY_RESET,
  REPORT_LOST_INVENTORY_SUCCESS,
} from "../../actions/kitchen/types-inventory";
import { CLEAR_ERRORS } from "../../actions/types";

//get inventory
export const getInventoryEmployeeReducer = (
  state = { inventory: {} },
  action
) => {
  switch (action.type) {
    case GET_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        inventory: action.payload,
      };
    case GET_INVENTORY_FAIL:
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

//report lost inventroy
export const reportLostInventoryReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case REPORT_LOST_INVENTORY_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case REPORT_LOST_INVENTORY_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        report: action.payload,
        isadded: true,
      };
    case REPORT_LOST_INVENTORY_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case REPORT_LOST_INVENTORY_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        report: null,
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

//get orders
export const getOrderEmployeeReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_FAIL:
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

//get orders
export const updateOrderStatusReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case CHANGE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isupdated: false,
      };
    case CHANGE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        order: action.payload,
        isupdated: true,
      };
    case CHANGE_ORDER_STATUS_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isupdated: false,
      };
    case CHANGE_ORDER_STATUS_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        order: null,
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
