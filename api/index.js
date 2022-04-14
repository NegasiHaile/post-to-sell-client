// ## importing
import {
  api_getAllProducts,
  api_getAllFeaturedProducts,
  api_deleteProduct,
  api_getAllUserProducts,
  api_deleteProductImage,
  api_editProduct,
  api_editProductImage,
} from "./products.js"; // all products APIs
import { api_getAllCategories } from "./categories.js"; //all categories APIs
import { api_getAllBanners } from "./banners"; //banners APIs
import { api_getAllUsers } from "./users"; // users APIs
import {
  api_addAdvert,
  api_getAllAdverts,
  api_getAllUserAdverts,
  api_deleteAdvert,
} from "./adverts"; // adverts APIs

// ## Exporting API Functions
export {
  api_getAllProducts,
  api_getAllFeaturedProducts,
  api_deleteProduct,
  api_getAllUserProducts,
  api_deleteProductImage,
  api_editProduct,
  api_editProductImage,
}; //product
export { api_getAllCategories }; //categories
export { api_getAllBanners }; // banner
export { api_getAllUsers }; // users
export {
  api_addAdvert,
  api_getAllAdverts,
  api_getAllUserAdverts,
  api_deleteAdvert,
}; // adverts
