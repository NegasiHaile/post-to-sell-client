export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});

export const updateProfileSuccess = (updates) => ({
  type: "UPDATE_PROFILE_SUCCESS",
  payload: updates,
});

export const clearProfile = () => ({
  type: "CLEAR_PROFILE",
});
