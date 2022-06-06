import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMP_AUTH_REQUEST,
  EMP_AUTH_SUCCESS,
  EMP_AUTH_FAIL,
} from "../../actions/kitchen/typesAuth";
import { CLEAR_ERRORS } from "../../actions/types";

//kitchen owner auth reducer
export const kitchenOwnerAuthReducer = (
  state = { token: {}, owner: {} },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case AUTH_REQUEST:
      return {
        progress: 20,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: true,
        token: action.payload,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: true,
        owner: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: false,
        token: null,
        owner: null,
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

//kitchen employee auth
export const kitchenEmployeeAuthReducer = (
  state = { employee: {}, token: {} },
  action
) => {
  switch (action.type) {
    case EMP_AUTH_REQUEST:
    case EMPLOYEE_LOGIN_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isAuthenticated: false,
      };
    case EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: true,
        token: action.payload,
      };
    case EMP_AUTH_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: true,
        employee: action.payload,
      };
    case EMP_AUTH_FAIL:
    case EMPLOYEE_LOGIN_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: false,
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
