import { useState, useEffect } from "react";

import Layout from "../../layouts/Main";
import Footer from "../../components/footer";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFilter from "../../components/products-filter";
import ProductsContent from "../../components/products-content";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {
  setUserProducts,
  clearUserProducts,
  setCategories,
  clearCategories,
} from "../../store/actions/productActions";

import { server } from "../../utils/server";
import EditProduct from "../../components/edit-product";

import {
  api_getAllUserProducts,
  api_getAllCategories,
  api_deleteProduct,
} from "../../api/index";
import Modal from "../../components/modal/Modal";

const countProducts = (field, value, products) => {
  let result = 0;
  products.map((product) => {
    if (product[field] === value) {
      result += 1;
    }
  });
  return result;
};

const getPriceRange = (products) => {
  let max = 0;
  let min = products.length > 0 ? products[0].currentPrice : 100000000000000;
  products.map((product) => {
    if (product.currentPrice > max) {
      max = product.currentPrice;
    }
    if (product.currentPrice < min) {
      min = product.currentPrice;
    }
  });
  return [
    max - min < 1 && min > 10 ? 0 : max,
    max - min < 1 && max < 10 ? 1000 : max,
  ];
};

const filterProducts = (products, filter) => {
  const categories = Object.keys(filter.categories).filter(
    (key) => filter.categories[key] === true
  );
  const sizes = Object.keys(filter.sizes).filter(
    (key) => filter.sizes[key] === true
  );
  const colors = Object.keys(filter.colors).filter(
    (key) => filter.colors[key] === true
  );

  const filteredProducts = products.filter((product) => {
    let categoryPass = true;
    let sizePass = true;
    let colorPass = true;

    if (categories.length > 0 && !categories.includes(product.category)) {
      categoryPass = false;
    }
    if (sizes.length > 0) {
      if (product.sizes && product.sizes.length > 0) {
        sizes.map((size) => {
          if (!product.sizes.includes(size)) {
            sizePass = false;
          }
        });
      } else {
        sizePass = false;
      }
    }
    if (colors.length > 0) {
      if (product.colors && product.colors.length > 0) {
        colors.map((color) => {
          if (!product.colors.includes(color)) {
            colorPass = false;
          }
        });
      } else {
        colorPass = false;
      }
    }

    return categoryPass && sizePass && colorPass;
  });
  let sortedFilteredProducts = [];
  if (!filter.sortBy || filter.sortBy === "") {
    sortedFilteredProducts = filteredProducts;
  } else if (filter.sortBy === "oldest") {
    sortedFilteredProducts = filteredProducts.sort((a, b) =>
      a.updatedAt > b.updatedAt ? 1 : -1
    );
  } else if (filter.sortBy === "latest") {
    sortedFilteredProducts = filteredProducts.sort((a, b) =>
      a.updatedAt > b.updatedAt ? -1 : 1
    );
  } else if (filter.sortBy === "price-low-high") {
    sortedFilteredProducts = filteredProducts.sort((a, b) =>
      a.currentPrice > b.currentPrice ? 1 : -1
    );
  } else if (filter.sortBy === "price-high-low") {
    sortedFilteredProducts = filteredProducts.sort((a, b) =>
      a.currentPrice > b.currentPrice ? -1 : 1
    );
  } else if (filter.sortBy === "high-rating") {
    sortedFilteredProducts = filteredProducts.sort((a, b) =>
      a.rate > b.rate ? -1 : 1
    );
  } else {
    sortedFilteredProducts = filteredProducts;
  }
  const isFiltered =
    categories.length > 0 || sizes.length > 0 || colors.length > 0;
  const length = filteredProducts.length;

  return { filteredProducts: sortedFilteredProducts, isFiltered, length };
};

const Products = () => {
  const dispatch = useDispatch();
  const [viewType, setViewType] = useState("all-products");
  const [selectedProduct, setSelectedProduct] = useState(null);
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
  const { products, categories, user } = useSelector((state) => {
    return {
      products: state.product.userProducts,
      categories: state.product.categories,
      user: state.auth.user,
    };
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filterValue, setFilterValue] = useState({
    categories: {},
    priceRange: [0, 1000],
    sizes: {},
    colors: {},
    sortBy: "",
  });
  const [filteredProducts, setFilteredProducts] = useState(null);

  const addArrayFilter = (filterType, field, value) => {
    setFilterValue({
      ...filterValue,
      [filterType]: {
        ...filterValue[filterType],
        [field]: value,
      },
    });
  };
  const addPriceFilter = (value) => {
    setFilterValue({
      ...filterValue,
      priceRange: value,
    });
  };
  const addSortByFilter = (value) => {
    setFilterValue({
      ...filterValue,
      sortBy: value,
    });
  };

  const [productCountByCategory, setProductCountByCategory] = useState([]);

  const loadProducts = async () => {
    setProductLoading({
      isLoading: true,
      state: "success",
      message: "",
    });
    dispatch(clearUserProducts());
    try {
      const res = await api_getAllUserProducts(user.id, user.accesstoken);
      const responseData = res.data;
      dispatch(setUserProducts(responseData));

      setProductLoading({
        isLoading: false,
        state: "success",
        message: "Product loaded succefully",
      });
    } catch (error) {
      console.log("error: ", error);
      dispatch(clearUserProducts());
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
      const res = await api_getAllCategories();

      const responseData = res.data;
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
  const onClickEdit = (product) => {
    console.log("product", product);
    setViewType("edit");
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };
  const onClickBack = () => {
    setViewType("all-products");
    setSelectedProduct(null);
    window.scrollTo(0, 0);
    loadProducts();
  };

  const [deleteProductStatus, setDeleteProductStatus] = useState({
    state: "success",
    message: "",
    deleting: false,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const onClickDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setDeleteModal(false);
    setSelectedProduct(null);
  };
  const onConfirmDeleteProduct = async () => {
    setDeleteProductStatus({
      state: "success",
      message: "",
      deleting: true,
    });
    try {
      const res = await api_deleteProduct(
        selectedProduct._id,
        user.accesstoken
      );
      const responseData = res.data;
      setDeleteProductStatus({
        state: "success",
        message: "Product deleted succefully",
        deleting: false,
      });
      onCloseDeleteModal();
      loadProducts();
    } catch (error) {
      console.log("error: ", error);
      setDeleteProductStatus({
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while deleting products!",
        deleting: false,
      });
    }
  };

  useEffect(() => {
    if (!products) {
      loadProducts();
    }
  }, [user]);
  useEffect(() => {
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
  useEffect(() => {
    if (products) {
      setPriceRange(getPriceRange(products));
    }
  }, [products]);
  useEffect(() => {
    if (products && filterValue) {
      setFilteredProducts(filterProducts(products, filterValue));
    }
  }, [products, filterValue]);

  return viewType === "edit" ? (
    <EditProduct product={selectedProduct} onClickBack={onClickBack} />
  ) : (
    <>
      <Layout>
        <Breadcrumb />
        <section className="products-page">
          <div className="container">
            <ProductsFilter
              categories={categories}
              categoriesloading={categoriesloading}
              loadCategories={loadCategories}
              productCountByCategory={productCountByCategory}
              addArrayFilter={addArrayFilter}
              priceRange={priceRange}
              addPriceFilter={addPriceFilter}
            />
            <ProductsContent
              products={filteredProducts /* products */}
              productloading={productloading}
              loadProducts={loadProducts}
              addSortByFilter={addSortByFilter}
              myProduct={true}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          </div>
        </section>
        <Footer />
      </Layout>
      {deleteModal && (
        <Modal
          onCloseModal={onCloseDeleteModal}
          onConfirm={onConfirmDeleteProduct}
          confirmLabel={"Delete"}
          confirmProcessLabel={"Deleting"}
          title={"Delete Proudct"}
          content={"Are you sure you want to delete the product?"}
          confirming={deleteProductStatus.deleting}
          confirmResult={{
            message: deleteProductStatus.message,
            state: deleteProductStatus.state,
          }}
        />
      )}
    </>
  );
};

export default Products;
