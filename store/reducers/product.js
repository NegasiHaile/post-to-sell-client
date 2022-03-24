const initialState = {
  products: null,
  userProducts: null,
  categories: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "CLEAR_PRODUCTS":
      return {
        ...state,
        products: null,
      };

    case "SET_USER_PRODUCTS":
      return {
        ...state,
        userProducts: action.payload,
      };
    case "CLEAR_USER_PRODUCTS":
      return {
        ...state,
        userProducts: null,
      };
      
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "CLEAR_CATEGORIES":
      return {
        ...state,
        categories: null,
      };
    default:
      return state;
  }
};

export default productReducer;
