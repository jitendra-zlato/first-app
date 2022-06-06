import {
  ADD_EXTRA_WORK_FAIL,
  ADD_EXTRA_WORK_REQUEST,
  ADD_EXTRA_WORK_RESET,
  ADD_EXTRA_WORK_SUCCESS,
  ADD_LEAVE_FOR_EMP_FAIL,
  ADD_LEAVE_FOR_EMP_REQUEST,
  ADD_LEAVE_FOR_EMP_RESET,
  ADD_LEAVE_FOR_EMP_SUCCESS,
  ADD_PERMISSION_TO_EMP_FAIL,
  ADD_PERMISSION_TO_EMP_REQUEST,
  ADD_PERMISSION_TO_EMP_RESET,
  ADD_PERMISSION_TO_EMP_SUCCESS,
  DELETE_EXTRA_WORK_FAIL,
  DELETE_EXTRA_WORK_REQUEST,
  DELETE_EXTRA_WORK_RESET,
  DELETE_EXTRA_WORK_SUCCESS,
  DELETE_LEAVE_OF_EMP_FAIL,
  DELETE_LEAVE_OF_EMP_REQUEST,
  DELETE_LEAVE_OF_EMP_RESET,
  DELETE_LEAVE_OF_EMP_SUCCESS,
  DELETE_PERMISSION_TO_EMP_FAIL,
  DELETE_PERMISSION_TO_EMP_REQUEST,
  DELETE_PERMISSION_TO_EMP_RESET,
  DELETE_PERMISSION_TO_EMP_SUCCESS,
} from "../../actions/kitchen/typesEmployee";
import { CLEAR_ERRORS } from "../../actions/types";

//add leave for the employee
export const employeeLeaveReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case ADD_LEAVE_FOR_EMP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_LEAVE_FOR_EMP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isadded: true,
      };
    case ADD_LEAVE_FOR_EMP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case ADD_LEAVE_FOR_EMP_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: null,
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

//delete leave of the employee
export const employeeLeaveDeleteReducer = (
  state = { employee: {} },
  action
) => {
  switch (action.type) {
    case DELETE_LEAVE_OF_EMP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isdeleted: false,
      };
    case DELETE_LEAVE_OF_EMP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isdeleted: true,
      };
    case DELETE_LEAVE_OF_EMP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isdeleted: false,
      };
    case DELETE_LEAVE_OF_EMP_RESET:
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

//add extra work done by the emloyee
export const employeeWorkReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case ADD_EXTRA_WORK_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_EXTRA_WORK_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isadded: true,
      };
    case ADD_EXTRA_WORK_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case ADD_EXTRA_WORK_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: null,
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

//delete extra work done by the employee
export const employeeWorkDeleteReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case DELETE_EXTRA_WORK_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isdeleted: false,
      };
    case DELETE_EXTRA_WORK_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isdeleted: true,
      };
    case DELETE_EXTRA_WORK_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isdeleted: false,
      };
    case DELETE_EXTRA_WORK_RESET:
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

//add extra work done by the emloyee
export const employeePermissionReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case ADD_PERMISSION_TO_EMP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isadded: false,
      };
    case ADD_PERMISSION_TO_EMP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isadded: true,
      };
    case ADD_PERMISSION_TO_EMP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isadded: false,
      };
    case ADD_PERMISSION_TO_EMP_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: null,
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

//delete extra work done by the employee
export const employeePermissionDeleteReducer = (
  state = { employee: {} },
  action
) => {
  switch (action.type) {
    case DELETE_PERMISSION_TO_EMP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isdeleted: false,
      };
    case DELETE_PERMISSION_TO_EMP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isdeleted: true,
      };
    case DELETE_PERMISSION_TO_EMP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isdeleted: false,
      };
    case DELETE_PERMISSION_TO_EMP_RESET:
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
