import axios from "axios";
import { BASE_URL } from "../../constants/base_url";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import {
  ADD_ITEM_SUBiN_FAIL,
  ADD_ITEM_SUBiN_REQUEST,
  ADD_ITEM_SUBiN_SUCCESS,
  ALL_SUB_INVENTORY_FAIL,
  ALL_SUB_INVENTORY_REQUEST,
  ALL_SUB_INVENTORY_SUCCESS,
  DELETE_SUBiN_FAIL,
  DELETE_SUBiN_REQUEST,
  DELETE_SUBiN_SUCCESS,
  GET_SUB_INVENTORY_FAIL,
  GET_SUB_INVENTORY_REQUEST,
  GET_SUB_INVENTORY_SUCCESS,
} from "./types_subInventory";

//get all sub inventory
export const getAllSubInventory = (kitchenId) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/subInventory/all?kitchenId=${kitchenId}`;
  try {
    dispatch({ type: ALL_SUB_INVENTORY_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ALL_SUB_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SUB_INVENTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get inventory by id
export const getSubInventoryAction =
  (kitchenId, itemId) => async (dispatch) => {
    const url = `${BASE_URL}/api/kitchen/subInventory?kitchenId=${kitchenId}&itemId=${itemId}`;
    try {
      dispatch({ type: GET_SUB_INVENTORY_REQUEST });
      const { data } = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": GetCookie("x-auth-token"),
        },
        withCredentials: true,
      });
      dispatch({
        type: GET_SUB_INVENTORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUB_INVENTORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//add item in subinventory
export const addItemSubInventory = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/subInventory/add`;
  try {
    dispatch({ type: ADD_ITEM_SUBiN_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_ITEM_SUBiN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_SUBiN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete in subinventory
export const deleteSubInventory = (deleteInfo) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/menu/delete-subItem`;
  try {
    dispatch({ type: DELETE_SUBiN_REQUEST });
    const { data } = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      data: deleteInfo,
      withCredentials: true,
    });
    dispatch({
      type: DELETE_SUBiN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUBiN_FAIL,
      payload: error.response.data.message,
    });
  }
};
