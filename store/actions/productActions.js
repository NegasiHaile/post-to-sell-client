export const setProducts = (product) => ({
  type: "SET_PRODUCTS",
  payload: product,
});
export const clearProducts = () => ({
  type: "CLEAR_PRODUCTS",
});

export const setUserProducts = (product) => ({
  type: "SET_USER_PRODUCTS",
  payload: product,
});
export const clearUserProducts = () => ({
  type: "CLEAR_USER_PRODUCTS",
});

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});
export const clearCategories = () => ({
  type: "CLEAR_CATEGORIES",
});
