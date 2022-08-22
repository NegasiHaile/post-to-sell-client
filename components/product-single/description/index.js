import { useSelector } from "react-redux";

// Utils
import {
  filterCategoryName,
  filterSubCategoryName,
  filterBrandName,
} from "../../../utils/ProductCategory/Category";

const Description = ({ product }) => {
  const { categories } = useSelector((state) => {
    return {
      categories: state.product.categories,
    };
  });

  const style = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        {/* <i className="icon-cart"></i> */}
        {categories && (
          <h4>
            {product.model}
            {"-"}
            {filterBrandName(
              categories,
              product.category,
              product.subCategory,
              product.brand
            )}
            {"-"}
            {filterSubCategoryName(
              categories,
              product.category,
              product.subCategory
            )}
            {"-"}
            {filterCategoryName(categories, product.category)}
          </h4>
        )}
        <p>{product.discription}</p>
      </div>
    </section>
  );
};

export default Description;
