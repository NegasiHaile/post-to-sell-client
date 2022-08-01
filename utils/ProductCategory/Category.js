// Filter the name of the category
export const filterCategoryName = (categories, CategoryId) => {
  const category = categories.filter((category) => category._id == CategoryId);
  if (category.length > 0) {
    return category[0].category;
  }
};

// Filter the name of the subcategory
export const filterSubCategoryName = (
  categories,
  CategoryId,
  subCategoryId
) => {
  const category = categories.filter((category) => category._id === CategoryId);
  const subCategory = category[0]?.subCategory.filter(
    (sub) => sub.id == subCategoryId
  );
  if (subCategory?.length > 0) {
    return subCategory[0].sub_name;
  }
};

// Filter the name of the brand name
export const filterBrandName = (
  categories,
  CategoryId,
  subCategoryId,
  brandId
) => {
  const category = categories.filter((category) => category._id === CategoryId);
  const subCategory = category[0]?.subCategory.filter(
    (sub) => sub.id == subCategoryId
  );
  const brand =
    subCategory &&
    subCategory[0]?.brands.filter((brand) => brand.id == brandId);

  if (brand?.length > 0) {
    return brand[0].brand_name;
  }
};
