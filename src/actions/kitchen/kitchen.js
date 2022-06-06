import {
  ADD_KITCHEN_FAIL,
  ADD_KITCHEN_REQUEST,
  ADD_KITCHEN_SUCCESS,
  DELETE_KITCHEN_FAIL,
  DELETE_KITCHEN_REQUEST,
  DELETE_KITCHEN_SUCCESS,
  GET_ALL_KITCHEN_FAIL,
  GET_ALL_KITCHEN_REQUEST,
  GET_ALL_KITCHEN_SUCCESS,
  GET_KITCHEN_FAIL,
  GET_KITCHEN_REQUEST,
  GET_KITCHEN_SUCCESS,
  UPDATE_KITCHEN_FAIL,
  UPDATE_KITCHEN_REQUEST,
  UPDATE_KITCHEN_SUCCESS,
} from "./typesKitchen";
import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import { BASE_URL } from "../../constants/base_url";


//add kitchen action - kitchen owner
export const addKitchenAction = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchens/add`;
  try {
    dispatch({ type: ADD_KITCHEN_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_KITCHEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_KITCHEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get kitchens action - kitchen owner
export const getAllKitchenAction = () => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchens/all`;
  try {
    dispatch({ type: GET_ALL_KITCHEN_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_ALL_KITCHEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_KITCHEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get one kitchen action - kitchen owner
export const getKitchenAction = (id) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchens?id=${id}`;
  try {
    dispatch({ type: GET_KITCHEN_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_KITCHEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_KITCHEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update kitchen action - kitchen owner
export const updateKitchen = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchens/update`;
  try {
    dispatch({ type: UPDATE_KITCHEN_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: UPDATE_KITCHEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_KITCHEN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete kitchen action - kitchen owner
export const deleteKitchenAction = (kitchenId) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchens/delete`;
  try {
    dispatch({ type: DELETE_KITCHEN_REQUEST });
    const { data } = await axios.delete(url, {
      headers: {
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
      data: { kitchenId },
    });
    dispatch({
      type: DELETE_KITCHEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_KITCHEN_FAIL,
      payload: error.response.data.message,
    });
  }
};
