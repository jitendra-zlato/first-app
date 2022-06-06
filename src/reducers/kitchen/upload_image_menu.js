import {
  UPLOAD_MENU_IMAGE_FAIL,
  UPLOAD_MENU_IMAGE_REQUEST,
  UPLOAD_MENU_IMAGE_RESET,
  UPLOAD_MENU_IMAGE_SUCCESS,
} from "../../actions/kitchen/types_upload_image";
import { CLEAR_ERRORS } from "../../actions/types";

//add kitchen menu reducer - kitchen owner
export const uploadMenuImages = (state = { image: {} }, action) => {
  switch (action.type) {
    case UPLOAD_MENU_IMAGE_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isuploaded: false,
      };
    case UPLOAD_MENU_IMAGE_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isuploaded: true,
        image: action.payload,
      };
    case UPLOAD_MENU_IMAGE_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isuploaded: false,
        error: action.payload,
      };
    case UPLOAD_MENU_IMAGE_RESET:
      return {
        ...state,
        progress: 100,
        isuploaded: false,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
