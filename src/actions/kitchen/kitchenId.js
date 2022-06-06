import {
  GET_KITCHEN_ID_REQUEST,
  GET_KITCHEN_ID_SUCCESS,
  SET_KITCHEN_ID_REQUEST,
  SET_KITCHEN_ID_SUCCESS,
} from "./typesKitchen";

// set kitchen id
export const setKitchenIdAction = (kitchenId) => async (dispatch) => {
  dispatch({ type: SET_KITCHEN_ID_REQUEST });
  localStorage.setItem("kitchenId", kitchenId);

  dispatch({
    type: SET_KITCHEN_ID_SUCCESS,
  });
};

// get kitchen id
export const getKitchenIdAction = () => async (dispatch) => {
  dispatch({ type: GET_KITCHEN_ID_REQUEST });
  const id = localStorage.getItem("kitchenId");
  
  dispatch({
    type: GET_KITCHEN_ID_SUCCESS,
    payload: id,
  });
};
