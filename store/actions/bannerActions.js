export const setBanners = (banner) => ({
  type: "SET_BANNERS",
  payload: banner,
});
export const clearBanners = () => ({
  type: "CLEAR_BANNERS",
});

export const setUserBanners = (banner) => ({
  type: "SET_USER_BANNERS",
  payload: banner,
});
export const clearUserBanners = () => ({
  type: "CLEAR_USER_BANNERS",
});
