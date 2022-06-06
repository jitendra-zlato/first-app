import { OPEN_HAMBURGER_REQUEST, OPEN_HAMBURGER_SUCCESS } from "./typesKitchen";

export const openKithenHamburger = () => async (dispatch) => {
  dispatch({ type: OPEN_HAMBURGER_REQUEST });
  let hamburger = JSON.parse(localStorage.getItem("kitchenHamburger"));
  if (hamburger === null) {
    hamburger = false;
    localStorage.setItem("kitchenHamburger", JSON.stringify(hamburger));
  } else {
    hamburger = !hamburger;
    localStorage.setItem("kitchenHamburger", JSON.stringify(hamburger));
  }
  dispatch({
    type: OPEN_HAMBURGER_SUCCESS,
    payload: hamburger,
  });
};
