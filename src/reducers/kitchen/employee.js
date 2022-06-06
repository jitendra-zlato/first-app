import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_RESET,
  ADD_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_BY_ID_FAIL,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_BY_ID_SUCCESS,
} from "../../actions/kitchen/typesEmployee";
import { CLEAR_ERRORS } from "../../actions/types";

//kitchen owner add employee to kitchen
export const addEmployeeReducer = (state = { addedEmployee: {} }, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        addedEmployee: action.payload,
        isadded: true,
      };
    case ADD_EMPLOYEE_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case ADD_EMPLOYEE_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        addedEmployee: null,
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

//kitchen owner get all employee
export const getAllEmployeeReducer = (state = { allEmployee: [] }, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        allEmployee: [],
      };
    case GET_ALL_EMPLOYEE_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        allEmployee: action.payload,
      };
    case GET_ALL_EMPLOYEE_FAIL:
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

//kitchen owner get one employee by id
export const getEmployeeByIdReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_BY_ID_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
      };
    case GET_EMPLOYEE_BY_ID_FAIL:
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
