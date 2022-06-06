import axios from "axios";
import { BASE_URL } from "../../constants/base_url";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";

import {
  END_SHIFT_FAIL,
  END_SHIFT_REQUEST,
  END_SHIFT_SUCCESS,
  GET_ALL_SHIFT_FAIL,
  GET_ALL_SHIFT_REQUEST,
  GET_ALL_SHIFT_SUCCESS,
  START_SHIFT_FAIL,
  START_SHIFT_REQUEST,
  START_SHIFT_SUCCESS,
} from "./typesShift";

//get employee shift - employee action
export const employeeStartShift = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/shift/start`;
  try {
    dispatch({ type: START_SHIFT_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: START_SHIFT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: START_SHIFT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get employee all shifts
export const getEmployeeAllShift = () => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/shift`;
  try {
    dispatch({ type: GET_ALL_SHIFT_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_ALL_SHIFT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SHIFT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// employee shift ends
export const employeeEndShift = () => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/shift/end`;
  try {
    dispatch({ type: END_SHIFT_REQUEST });
    const { data } = await axios.put(
      url,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": GetCookie("x-auth-token"),
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: END_SHIFT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: END_SHIFT_FAIL,
      payload: error.response.data.message,
    });
  }
};
