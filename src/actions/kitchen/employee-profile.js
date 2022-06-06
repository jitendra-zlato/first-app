import {
  ADD_EXTRA_WORK_FAIL,
  ADD_EXTRA_WORK_REQUEST,
  ADD_EXTRA_WORK_SUCCESS,
  ADD_LEAVE_FOR_EMP_FAIL,
  ADD_LEAVE_FOR_EMP_REQUEST,
  ADD_LEAVE_FOR_EMP_SUCCESS,
  ADD_PERMISSION_TO_EMP_FAIL,
  ADD_PERMISSION_TO_EMP_REQUEST,
  ADD_PERMISSION_TO_EMP_SUCCESS,
  DELETE_EXTRA_WORK_FAIL,
  DELETE_EXTRA_WORK_REQUEST,
  DELETE_EXTRA_WORK_SUCCESS,
  DELETE_LEAVE_OF_EMP_FAIL,
  DELETE_LEAVE_OF_EMP_REQUEST,
  DELETE_LEAVE_OF_EMP_SUCCESS,
  DELETE_PERMISSION_TO_EMP_FAIL,
  DELETE_PERMISSION_TO_EMP_REQUEST,
  DELETE_PERMISSION_TO_EMP_SUCCESS,
  UPDATE_KITCHEN_EMP_FAIL,
  UPDATE_KITCHEN_EMP_REQUEST,
  UPDATE_KITCHEN_EMP_SUCCESS,
} from "./typesEmployee";

import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import { BASE_URL } from "../../constants/base_url";

//update kitchen employee - kitchen owner
export const updateKitchenEmployee = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/update`;
  try {
    dispatch({ type: UPDATE_KITCHEN_EMP_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: UPDATE_KITCHEN_EMP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_KITCHEN_EMP_FAIL,
      payload: error.response.data.message,
    });
  }
};

//add kitchen employe leave - kitchen owner
export const addEmployeeLeaveAction = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/leave`;
  try {
    dispatch({ type: ADD_LEAVE_FOR_EMP_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_LEAVE_FOR_EMP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_LEAVE_FOR_EMP_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete kitchen employe leave - kitchen owner
export const deleteEmployeeLeaveAction =
  (kitchenId, employeeId, leaveId) => async (dispatch) => {
    const url = `${BASE_URL}/api/kitchen/employee/leave`;
    try {
      dispatch({ type: DELETE_LEAVE_OF_EMP_REQUEST });
      const { data } = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": GetCookie("x-auth-token"),
        },
        withCredentials: true,
        data: { kitchenId, employeeId, leaveId },
      });
      dispatch({
        type: DELETE_LEAVE_OF_EMP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_LEAVE_OF_EMP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//add kitchen employe extra-work - kitchen owner
export const addEmployeeExtraWork = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/extra-work`;
  try {
    dispatch({ type: ADD_EXTRA_WORK_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_EXTRA_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EXTRA_WORK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete kitchen employe extra-work - kitchen owner
export const deleteEmployeeExtraWork =
  (kitchenId, employeeId, extraWorkId) => async (dispatch) => {
    const url = `${BASE_URL}/api/kitchen/employee/leave`;
    try {
      dispatch({ type: DELETE_EXTRA_WORK_REQUEST });
      const { data } = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": GetCookie("x-auth-token"),
        },
        withCredentials: true,
        data: { kitchenId, employeeId, extraWorkId },
      });
      dispatch({
        type: DELETE_EXTRA_WORK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_EXTRA_WORK_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//add kitchen employe permission - kitchen owner
export const addEmployeePermission = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/permissions`;
  try {
    dispatch({ type: ADD_PERMISSION_TO_EMP_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_PERMISSION_TO_EMP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PERMISSION_TO_EMP_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete kitchen employe permission - kitchen owner
export const deleteEmployeePermission =
  (kitchenId, employeeId, permissionId) => async (dispatch) => {
    const url = `${BASE_URL}/api/kitchen/employee/permissions`;
    try {
      dispatch({ type: DELETE_PERMISSION_TO_EMP_REQUEST });
      const { data } = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": GetCookie("x-auth-token"),
        },
        withCredentials: true,
        data: { kitchenId, employeeId, permissionId },
      });
      dispatch({
        type: DELETE_PERMISSION_TO_EMP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PERMISSION_TO_EMP_FAIL,
        payload: error.response.data.message,
      });
    }
  };
