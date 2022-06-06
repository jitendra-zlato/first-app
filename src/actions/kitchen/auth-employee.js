import {
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMP_AUTH_REQUEST,
  EMP_AUTH_SUCCESS,
  EMP_AUTH_FAIL,
} from "./typesAuth";
import axios from "axios";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import { BASE_URL } from "../../constants/base_url";


//kitchen employee login action
export const kitchenEmployeeLogin = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/auth/login`;
  try {
    dispatch({ type: EMPLOYEE_LOGIN_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data.token,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//employee auth action
export const authenticateKitchenEmployee = () => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/employee/auth`;
  const token = GetCookie("x-auth-token");
  if (token) {
    try {
      dispatch({ type: EMP_AUTH_REQUEST });
      const { data } = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        withCredentials: true,
      });
      dispatch({
        type: EMP_AUTH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EMP_AUTH_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};
