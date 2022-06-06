import {
  DELETE_EMP_FAIL,
  DELETE_EMP_REQUEST,
  DELETE_EMP_RESET,
  DELETE_EMP_SUCCESS,
  UPDATE_KITCHEN_EMP_FAIL,
  UPDATE_KITCHEN_EMP_REQUEST,
  UPDATE_KITCHEN_EMP_RESET,
  UPDATE_KITCHEN_EMP_SUCCESS,
} from "../../actions/kitchen/typesEmployee";

import { CLEAR_ERRORS } from "../../actions/types";

//kitchen owner update employee
export const updateEmployeeReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case UPDATE_KITCHEN_EMP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isupdated: false,
      };
    case UPDATE_KITCHEN_EMP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isupdated: true,
      };
    case UPDATE_KITCHEN_EMP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isupdated: false,
      };
    case UPDATE_KITCHEN_EMP_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: null,
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

//delete the employee
export const employeeDeleteReducer = (
  state = { employee: {} },
  action
) => {
  switch (action.type) {
    case DELETE_EMP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isdeleted: false,
      };
    case DELETE_EMP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isdeleted: true,
      };
    case DELETE_EMP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isdeleted: false,
      };
    case DELETE_EMP_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: null,
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
