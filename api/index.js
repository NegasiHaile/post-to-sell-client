// ## importing
import {
  api_getAllActiveProducts,
  api_getAllFeaturedProducts,
  api_getProductDetail,
  api_deleteProduct,
  api_getAllUserProducts,
  api_deleteProductImage,
  api_editProduct,
  api_addProductImage,
  api_editProductImage,
  api_updateProductPaymentStatus,
} from "./products.js"; // Product APIs

import { api_getAllCategories } from "./categories.js"; // Categorie APIs

import { api_getAllBanners } from "./banners"; // Banner APIs

import {
  api_getAllUsers,
  api_getUserProfile,
  api_editUserProfile,
  api_ChangeMyPassword,
  api_scheduleNotification,
  api_UpdateNotificationStatusToSeen,
  api_DeleteUserNotification,
} from "./users"; // User APIs

import {
  api_addAdvert,
  api_getAllAdverts,
  api_getAllUserAdverts,
  api_deleteAdvert,
  api_editAdvert,
  api_editAdvertBanner,
} from "./adverts"; // Advert APIs

// ## Exporting API Functions
//product
export {
  api_getAllActiveProducts,
  api_getAllFeaturedProducts,
  api_getProductDetail,
  api_deleteProduct,
  api_getAllUserProducts,
  api_deleteProductImage,
  api_editProduct,
  api_addProductImage,
  api_editProductImage,
  api_updateProductPaymentStatus,
};

//categories
export { api_getAllCategories };

// banner
export { api_getAllBanners };

// users
export {
  api_getAllUsers,
  api_getUserProfile,
  api_editUserProfile,
  api_ChangeMyPassword,
  api_scheduleNotification,
  api_UpdateNotificationStatusToSeen,
  api_DeleteUserNotification,
};

// adverts
export {
  api_addAdvert,
  api_getAllAdverts,
  api_getAllUserAdverts,
  api_deleteAdvert,
  api_editAdvert,
  api_editAdvertBanner,
};
