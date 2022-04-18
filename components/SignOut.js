import { signoutSuccess } from "../store/actions/authActions";
import {
  clearProducts,
  clearUserProducts,
} from "../store/actions/productActions";
import { clearProfile } from "../store/actions/profileActions";

export const signOut = (dispatch) => {
  dispatch(clearProfile());
  dispatch(clearProducts());
  dispatch(clearUserProducts());
  dispatch(signoutSuccess());
};
