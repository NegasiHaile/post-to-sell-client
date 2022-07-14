// ## importing
import {
  api_getAllProducts,
  api_getAllFeaturedProducts,
  api_deleteProduct,
  api_getAllUserProducts,
  api_deleteProductImage,
  api_editProduct,
  api_addProductImage,
  api_editProductImage,
} from "./products.js"; // all products APIs

import { api_getAllCategories } from "./categories.js"; //all categories APIs

import { api_getAllBanners } from "./banners"; //banners APIs

import {
  api_getAllUsers,
  api_getUserProfile,
  api_editUserProfile,
} from "./users"; // users APIs

import {
  api_addAdvert,
  api_getAllAdverts,
  api_getAllUserAdverts,
  api_deleteAdvert,
  api_editAdvert,
  api_editAdvertBanner,
} from "./adverts"; // adverts APIs

// ## Exporting API Functions
//product
export {
  api_getAllProducts,
  api_getAllFeaturedProducts,
  api_deleteProduct,
  api_getAllUserProducts,
  api_deleteProductImage,
  api_editProduct,
  api_addProductImage,
  api_editProductImage,
};

//categories
export { api_getAllCategories };

// banner
export { api_getAllBanners };

// users
export { api_getAllUsers, api_getUserProfile, api_editUserProfile };

// adverts
export {
  api_addAdvert,
  api_getAllAdverts,
  api_getAllUserAdverts,
  api_deleteAdvert,
  api_editAdvert,
  api_editAdvertBanner,
};
