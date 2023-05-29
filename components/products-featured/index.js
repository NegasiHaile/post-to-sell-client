import { useState, useEffect } from "react";
import ProductsCarousel from "./carousel";
import { useRouter } from "next/router";
import useSwr from "swr";

import { useDispatch, useSelector } from "react-redux";
import { setProducts, clearProducts } from "../../store/actions/productActions";
import { api_getAllFeaturedProducts } from "../../api/index";

const filterProducts = (products, filters) => {
  const newProducts = products.filter((product) => {
    let result = true;
    filters.map((filter) => {
      const key = Object.keys(filter)[0];
      if (product[key] !== filter[key]) {
        result = false;
      }
    });
    return result;
  });
  return newProducts;
};

const ProductsFeatured = () => {
  const router = useRouter();
  /* const fetcher = (url) => fetch(url).then((res) => res.json());
  const [fproducts, setFproducts] = useState([]);

  useEffect(async () => {
    const res = await api_getAllFeaturedProducts();
    setFproducts(res.data);
  }, []); */

  const dispatch = useDispatch();
  const [productloading, setProductLoading] = useState({
    isLoading: false,
    state: "success",
    message: "",
  });

  const { products } = useSelector((state) => {
    return {
      products: state.product.products,
    };
  });
  const [filteredProducts, setFilteredProducts] = useState(null);
  console.log("filteredProducts", filteredProducts);
  const loadProducts = async () => {
    setProductLoading({
      isLoading: true,
      state: "success",
      message: "",
    });
    dispatch(clearProducts());
    try {
      const res = await api_getAllFeaturedProducts();
      const responseData = res.data;
      dispatch(setProducts(responseData));

      setProductLoading({
        isLoading: false,
        state: "success",
        message: "Product loaded succefully",
      });
    } catch (error) {
      console.log("error: ", error);
      dispatch(clearProducts());
      setProductLoading({
        isLoading: false,
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while loading products!",
      });
    }
  };

  useEffect(() => {
    if (!products) {
      loadProducts();
    }
  }, []);
  useEffect(() => {
    if (products) {
      setFilteredProducts(filterProducts(products, [{ postType: "Featured" }]));
    }
  }, [products]);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Featured Products</h3>
          <button
            className="btn btn--rounded btn--border"
            onClick={() => router.push("/products")}
          >
            Show All
          </button>
        </header>

        <ProductsCarousel products={filteredProducts} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
