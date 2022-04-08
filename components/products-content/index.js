import { useState, useEffect } from "react";
import List from "./list";

const ProductsContent = ({
  products,
  productloading,
  loadProducts,
  addSortByFilter,
  myProduct,
  onClickEdit,
  onClickDelete,
}) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>
          {products &&
            (products.isFiltered ? (
              <>
                Filtered Products <span>({products.length})</span>
              </>
            ) : (
              <>
                All Products <span>({products.length})</span>
              </>
            ))}
        </h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters"></i>
        </button>
        <form
          className={`products-content__filter ${
            orderProductsOpen ? "products-order-open" : ""
          }`}
        >
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select onChange={(value) => addSortByFilter(value.target.value)}>
                <option value={""}>none</option>
                <option value={"oldest"}>Sort by oldest</option>
                <option value={"latest"}>Sort by latest</option>
                <option value={"price-low-high"}>Sort by Price Low-High</option>
                <option value={"price-high-low"}>Sort by Price High-Low</option>
                <option value={"high-rating"}>Sort by high rating</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List
        products={products ? products.filteredProducts : null}
        isFiltered={products ? products.isFiltered : false}
        productloading={productloading}
        loadProducts={loadProducts}
        myProduct={myProduct}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    </section>
  );
};

export default ProductsContent;
