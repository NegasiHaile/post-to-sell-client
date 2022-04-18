const initialState = {
  banners: null,
  userBanners: null,
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BANNERS":
      return {
        ...state,
        banners: action.payload,
      };
    case "CLEAR_BANNERS":
      return {
        ...state,
        banners: null,
      };

    case "SET_USER_BANNERS":
      return {
        ...state,
        userBanners: action.payload,
      };
    case "CLEAR_USER_BANNERS":
      return {
        ...state,
        userBanners: null,
      };

    default:
      return state;
  }
};

export default bannerReducer;
