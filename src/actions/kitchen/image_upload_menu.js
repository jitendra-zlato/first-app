import axios from "axios";
import { BASE_URL } from "../../constants/base_url";

//getting token from cookie
import GetCookie from "../../hooks/GetCookie";
import {
  UPLOAD_MENU_IMAGE_FAIL,
  UPLOAD_MENU_IMAGE_REQUEST,
  UPLOAD_MENU_IMAGE_SUCCESS,
} from "./types_upload_image";

//add kitchen menu action - kitchen owner
export const uploadMenuImageAction = (formData) => async (dispatch) => {
  const url = `${BASE_URL}/api/kitchen/media/upload`;
  try {
    dispatch({ type: UPLOAD_MENU_IMAGE_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": GetCookie("x-auth-token"),
      },
      withCredentials: true,
    });
    dispatch({
      type: UPLOAD_MENU_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_MENU_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
