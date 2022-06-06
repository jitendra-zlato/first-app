import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  CREATE_INVENTORY_FAIL,
  CREATE_INVENTORY_REQUEST,
  CREATE_INVENTORY_SUCCESS,
  GET_KITCHEN_INVENTORY_FAIL,
  GET_KITCHEN_INVENTORY_REQUEST,
  GET_KITCHEN_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
} from "./types-inventory";

import { BASE_URL} from '../../constants/base_url'
//create inventory
// export const createInventoryAction = (formData) => async (dispatch) => {
//   const url = `${BASE_URL}/api/kitchen/inventory/create`;
//   try {
//     dispatch({ type: CREATE_INVENTORY_REQUEST });
//     const { data } = await axios.post(url, formData, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "x-auth-token": GetCookie("x-auth-token"),
//       },
//       withCredentials: true,
//     });
//     dispatch({
//       type: CREATE_INVENTORY_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CREATE_INVENTORY_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//add item to inventory
export const addItemToInventory = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/inventory/add-item`;
  try {
    dispatch({ type: ADD_ITEM_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get kitchen inventory
export const getOwnerInventoryAction = (kitchenId) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/inventory?kitchenId=${kitchenId}`;
  try {
    dispatch({ type: GET_KITCHEN_INVENTORY_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_KITCHEN_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_KITCHEN_INVENTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update kitchen inventory
export const updateItemFromInventory = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/inventory/update`;
  try {
    dispatch({ type: UPDATE_INVENTORY_REQUEST });
    const { data } = await axios.put(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: UPDATE_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_INVENTORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
