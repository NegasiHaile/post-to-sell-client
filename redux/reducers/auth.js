import { createReducer } from "reduxsauce";

import { Types } from "../actionCreators";

export const INITIAL_STATE = {
  id: "",
  role: "",
  token: null,
  verification_state: "",
};

// ------

export const signinSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  ...action.payload,
});

export const signoutSuccess = (state = INITIAL_STATE, action) => ({});

export const HANDLERS = {
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNOUT_SUCCESS]: signoutSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
