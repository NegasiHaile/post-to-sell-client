const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };

    case "SIGNOUT_SUCCESS":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
