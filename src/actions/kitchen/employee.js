import {
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMP_FAIL,
  DELETE_EMP_REQUEST,
  DELETE_EMP_SUCCESS,
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_BY_ID_FAIL,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_BY_ID_SUCCESS,
} from "./typesEmployee";
import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import { BASE_URL } from "../../constants/base_url";

//add employee action - kitchen owner
export const addEmployee = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/add`;
  try {
    dispatch({ type: ADD_EMPLOYEE_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get kitchen all employee action - kitchen owner
export const getAllEmployeeAction = (kitchenId) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/all?kitchenId=${kitchenId}`;
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_ALL_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get kitchen employee by id action - kitchen owner
export const getEmployeeById = (employeeId, kitchenId) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee?empId=${employeeId}&kitchenId=${kitchenId}`;
  try {
    dispatch({ type: GET_EMPLOYEE_BY_ID_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_EMPLOYEE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_BY_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete kitchen employee - kitchen owner
export const deleteKitchenEmployee =
  (kitchenId, employeeId) => async (dispatch) => {
    const url = `${BASE_URL}/api/kitchen/employee`;
    try {
      dispatch({ type: DELETE_EMP_REQUEST });
      const { data } = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": GetCookie("x-auth-token"),
        },
        withCredentials: true,
        data: { employeeId, kitchenId },
      });
      dispatch({
        type: DELETE_EMP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_EMP_FAIL,
        payload: error.response.data.message,
      });
    }
  };
