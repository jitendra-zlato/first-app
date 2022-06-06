import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_RESET,
  CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_RESET,
  PROFILE_UPDATE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_RESET,
  VERIFY_OTP_SUCCESS,
} from "../../actions/kitchen/typesOwner";
import { CLEAR_ERRORS } from "../../actions/types";

//kitchen owner forgot passowrd reducer
export const kitchenOwnerForgotPasswordReducer = (
  state = { forgotPassword: {} },
  action
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isforgoted:false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        forgotPassword: action.payload,
        isforgoted: true,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isforgoted: false,
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

//kitchen owner verify opt reducer
export const kitchenOwnerVerifyOtpReducer = (
  state = { verifyOtp: {} },
  action
) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isverified: false,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        verifyOtp: action.payload,
        isverified: true,
      };
    case VERIFY_OTP_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isverified: false,
      };
    case VERIFY_OTP_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        isverified: false,
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

//kitchen owner change passowrd reducer
export const kitchenOwnerResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isreset: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        isreset: true,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isreset: false,
        error: action.payload,
      };
    case RESET_PASSWORD_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        isreset: false,
        error: null,
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

//kitchen owner change passowrd reducer
export const kitchenOwnerChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        ischanged: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        ischanged: true,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        ischanged: false,
        error: action.payload,
      };
    case CHANGE_PASSWORD_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        ischanged: false,
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

//kitchen owner profile get reducer
export const kitchenOwnerProfileReducer = (
  state = { KitchenOwnerProfile: {} },
  action
) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        KitchenOwnerProfile: action.payload,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
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

//kitchen owner profile update reducer
export const kitchenOwnerProfileUpdateReducer = (
  state = { KitchenOwnerProfileUpdate: {} },
  action
) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        progress: 20,
        loading: true,
        isupdated: false,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        progress: 100,
        loading: false,
        KitchenOwnerProfileUpdate: action.payload,
        isupdated: true,
      };
    case PROFILE_UPDATE_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        isupdated: false,
      };
    case PROFILE_UPDATE_RESET:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: null,
        isupdated: false,
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
