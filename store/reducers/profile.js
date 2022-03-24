const initialState = {
  profile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
