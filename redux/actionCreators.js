import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  signinSuccess: ["payload"],
  signoutSuccess: null,
  signin: ["user_name", "password"],
});

export default Creators;
