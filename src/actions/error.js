import { CLEAR_ERRORS } from "./types";

//clearing the errors
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
