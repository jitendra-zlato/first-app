import {
  END_SHIFT_REQUEST,
  END_SHIFT_SUCCESS,
  END_SHIFT_FAIL,
  START_SHIFT_FAIL,
  START_SHIFT_REQUEST,
  START_SHIFT_SUCCESS,
  GET_ALL_SHIFT_REQUEST,
  GET_ALL_SHIFT_FAIL,
  GET_ALL_SHIFT_SUCCESS,
} from "../../actions/kitchen/typesShift";

import { CLEAR_ERRORS } from "../../actions/types";

// employee shift start
export const employeeShiftStartReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case START_SHIFT_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isstarted: false,
      };
    case START_SHIFT_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isstarted: true,
      };
    case START_SHIFT_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isstarted: false,
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

// employee shift end
export const employeeShiftEndReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case END_SHIFT_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isended: false,
      };
    case END_SHIFT_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        employee: action.payload,
        isended: true,
      };
    case END_SHIFT_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isended: false,
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

// employee all shifts
export const employeeShifts = (state = { shifts: {} }, action) => {
  switch (action.type) {
    case GET_ALL_SHIFT_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_ALL_SHIFT_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        shifts: action.payload,
      };
    case GET_ALL_SHIFT_FAIL:
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
