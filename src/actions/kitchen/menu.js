import {
  ADD_ITEM_TO_MENU_REQUEST,
  ADD_ITEM_TO_MENU_SUCCESS,
  ADD_ITEM_TO_MENU_FAIL,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAIL,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAIL,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  GET_MENU_FAIL,
  UPDATE_MENU_ITEM_REQUEST,
  UPDATE_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_FAIL,
} from "./typesMenu";
import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import { BASE_URL } from "../../constants/base_url";


//add kitchen menu action - kitchen owner
export const addKitchenMenu = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/menu`;
  try {
    dispatch({ type: ADD_MENU_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_MENU_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};

//add item to kitchen menu action - kitchen owner
export const addKitchenMenuItemAction = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/menu/add-item`;
  try {
    dispatch({ type: ADD_ITEM_TO_MENU_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_ITEM_TO_MENU_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get kitchen menu - kitchen owner
export const getKitchenMenuAction = (id) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/menu?id=${id}`;
  try {
    dispatch({ type: GET_MENU_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_MENU_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MENU_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update kitchen menu item - kithen owner
export const updateMenuItemAction = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/menu/update-item`;
  try {
    dispatch({ type: UPDATE_MENU_ITEM_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: UPDATE_MENU_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MENU_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete kitchen menu item action - kitchen owner
export const deleteMenuItem = (kitchenId, itemId) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/menu/delete-item`;
  try {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    const { data } = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
      data: { kitchenId, itemId },
    });
    dispatch({
      type: DELETE_MENU_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MENU_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};
