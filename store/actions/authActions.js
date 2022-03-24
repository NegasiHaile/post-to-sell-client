export const signinSuccess = (user) => ({
  type: "SIGNIN_SUCCESS",
  payload: user,
});

export const signoutSuccess = () => ({
  type: "SIGNOUT_SUCCESS",
});
