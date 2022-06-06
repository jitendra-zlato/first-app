import { OPEN_HAMBURGER_SUCCESS } from "../../actions/kitchen/typesKitchen";

export const kitchenHamburgerReducer = (state = { hamburger: {} }, action) => {
  switch (action.type) {
    case OPEN_HAMBURGER_SUCCESS:
      return {
        hamburger: action.payload,
      };
    default:
      return state;
  }
};
