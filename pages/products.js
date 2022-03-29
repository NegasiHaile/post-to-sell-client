import { useState, useEffect } from "react";

import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import ProductsFilter from "../components/products-filter";
import ProductsContent from "../components/products-content";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  clearProducts,
  setCategories,
  clearCategories,
} from "../store/actions/productActions";

import { server } from "../utils/server";

const countProducts = (field, value, products) => {
  const result = 0;
  products.map((product) => {
    if (product[field] === value) {
      result += 1;
    }
  });
  return result;
};

const Products = () => {
  const dispatch = useDispatch();
  const [productloading, setProductLoading] = useState({
    isLoading: false,
    state: "success",
    message: "",
  });
  const [categoriesloading, setCategoriesLoading] = useState({
    isLoading: false,
    state: "success",
    message: "",
  });
  const { products, categories } = useSelector((state) => {
    return {
      products: state.product.products,
      categories: state.product.categories,
    };
  });

  const [productCountByCategory, setProductCountByCategory] = useState([]);

  const loadProducts = async () => {
    setProductLoading({
      isLoading: true,
      state: "success",
      message: "",
    });
    dispatch(clearProducts());
    try {
      const res = await axios.get(`${server}/api/products/list/all`);

      const responseData = res.data;
      console.log("responseData", responseData);
      dispatch(setProducts(responseData));

      setProductLoading({
        isLoading: false,
        state: "success",
        message: "Product loaded succegully",
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
  const loadCategories = async () => {
    setCategoriesLoading({
      isLoading: true,
      state: "success",
      message: "",
    });
    dispatch(clearCategories());
    try {
      const res = await axios.get(`${server}/api/categories/list`);

      const responseData = res.data;
      console.log("responseData", responseData);
      dispatch(setCategories(responseData));

      setCategoriesLoading({
        isLoading: false,
        state: "success",
        message: "Category loaded succefully",
      });
    } catch (error) {
      console.log("error: ", error);
      dispatch(clearCategories());
      setCategoriesLoading({
        isLoading: false,
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while loading categories!",
      });
    }
  };

  useEffect(() => {
    if (!products) {
      loadProducts();
    }
    if (!categories) {
      loadCategories();
    }
  }, []);

  useEffect(() => {
    if (categories && products) {
      setProductCountByCategory(
        categories.map((category) => {
          return {
            id: category._id,
            name: category.category,
            subCategory: category.subCategory,
            count: countProducts("category", category._id, products),
          };
        })
      );
    }
  }, [products, categories]);
  console.log("productCountByCategory", productCountByCategory);
  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            categories={categories}
            categoriesloading={categoriesloading}
            loadCategories={loadCategories}
            productCountByCategory={productCountByCategory}
          />
          <ProductsContent
            products={products}
            productloading={productloading}
            loadProducts={loadProducts}
          />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;
