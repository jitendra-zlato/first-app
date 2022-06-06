import axios from "axios";
import { BASE_URL } from "../../constants/base_url";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import {
  CHANGE_ORDER_STATUS_FAIL,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  GET_INVENTORY_FAIL,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  REPORT_LOST_INVENTORY_FAIL,
  REPORT_LOST_INVENTORY_REQUEST,
  REPORT_LOST_INVENTORY_SUCCESS,
} from "./types-inventory";

//get inventory employee request
export const getInventoryAction = () => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/inventory`;
  try {
    dispatch({ type: GET_INVENTORY_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INVENTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//report lost inventroy
export const reportLostInventory = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/inventory/report`;
  try {
    dispatch({ type: REPORT_LOST_INVENTORY_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: REPORT_LOST_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_LOST_INVENTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get order in queue employee action
export const getOrderInQueue = () => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/order/queue`;
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//change status of order 
export const changeStatusOfOrder = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/order/status`;
  try {
    dispatch({ type: CHANGE_ORDER_STATUS_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: CHANGE_ORDER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_ORDER_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};
