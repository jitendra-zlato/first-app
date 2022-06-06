import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from "./typesAuth";
import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import { BASE_URL } from "../../constants/base_url";

//kitchen owner register action
// export const kitchenOwnerRegister = (formData) => async (dispatch) => {
//   const url = `${BASE_URL}/api/owner/register`;
//   try {
//     dispatch({ type: REGISTER_REQUEST });
//     const { data } = await axios.post(url, formData, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     });
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: REGISTER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// kitchen owner login action
export const kitchenOwnerLogin = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/owner/login`;
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.token,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errors[0].msg,
    });
  }
};

//get kitchen owner
export const authenticateKitchenOwner = () => async (dispatch) => {
  const url = `${BASE_URL}/api/owner`;
  const token = GetCookie("x-auth-token");

  if (token) {
    try {
      dispatch({ type: AUTH_REQUEST });
      const { data } = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        withCredentials: true,
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};
