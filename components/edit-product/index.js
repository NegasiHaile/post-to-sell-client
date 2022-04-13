import { useState, useEffect } from "react";
import Layout from "../../layouts/Main";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import CheckboxColor from "../../components/products-filter/form-builder/checkbox-color";
import Checkbox from "../../components/products-filter/form-builder/checkbox";
import productsColors from "../../utils/data/products-colors";
import productsSizes from "../../utils/data/products-sizes";

import { useForm } from "react-hook-form";
import { server } from "../../utils/server";
import { postData } from "../../utils/services";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductItemLoading from "../../components/product-item/add-product-preview";
import {
  api_getAllCategories,
  api_deleteProductImage,
  api_editProduct,
  api_editProductImage,
} from "../../api/index";
import {
  clearCategories,
  setCategories,
} from "../../store/actions/productActions";
// import { ToastContainer, toast } from "react-toastify";

const contactAddress = {
  phoneNumber: "0983339025",
  email: "yismawmintesnot@gmail.com",
  address: "addis ababa, 22",
  telegramUsername: "minoty",
};

const categoryParser = (categories) => {
  let result = {};
  if (categories) {
    categories.map((category) => {
      result[category._id] = {
        label: category.category,
        value: category._id,
        subCategory: category.subCategory,
      };
    });
  }
  return result;
};

const AddProductPage = ({ product, onClickBack }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [addingProduct, setAddingProduct] = useState(false);
  const [result, setResult] = useState({ state: "success", message: "" });

  const [useProfileAddress, setUseProfileAddress] = useState(false);
  const [previousAddress, setPreviousAddress] = useState({
    phoneNumber: "",
    email: "",
    address: "",
    telegramUsername: "",
  });

  const [previousImages2, setPreviousImages2] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [previousImages, setPreviousImages] = useState({
    0: {
      preview: null,
      file: null,
      new: false,
    },
    1: {
      preview: null,
      file: null,
      new: false,
    },
    2: {
      preview: null,
      file: null,
      new: false,
    },
    3: {
      preview: null,
      file: null,
      new: false,
    },
    4: {
      preview: null,
      file: null,
      new: false,
    },
  });
  console.log("previousImages", previousImages);
  const [preview, setPreview] = useState();

  const [selectedMultipleFile, setSelectedMultipleFile] = useState([]);
  const [previewMultiple, setPreviewMultiple] = useState([]);

  const [productVariant, setProductVariant] = useState({
    sizes: {},
    colors: {},
  });
  const addProductVariant = (variantType, field, value) => {
    setProductVariant({
      ...productVariant,
      [variantType]: {
        ...productVariant[variantType],
        [field]: value,
      },
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
    setAddingProduct(true);
    setResult({ state: "success", message: "" });
    try {
      const sizes = Object.keys(productVariant.sizes).filter(
        (key) => productVariant.sizes[key] === true
      );
      const colors = Object.keys(productVariant.colors).filter(
        (key) => productVariant.colors[key] === true
      );
      const contacts = {
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        telegramUsername: data.telegramUsername,
      };
      const uploadedData = {
        contacts: contacts,
        userId: auth.user.id,
        productName: data.productName,
        brand: data.brand,
        category: data.category,
        subCategory: data.subCategory,
        currentPrice: data.currentPrice,
        price: data.price,
        discription: data.discription,
        postType: "postType",
        sizes: sizes,
        colors: colors,
      };
      const res = await api_editProduct(product._id, uploadedData, {
        headers: {
          Authorization: auth.user.accesstoken,
        },
      });
      setResult({
        state: "success",
        message: "Proudct edited succefully!",
      });
      const responseData = res.data;
      setAddingProduct(false);
      onClickBack();
    } catch (error) {
      console.log("error: ", error);
      setResult({
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while editing product!",
      });
      setAddingProduct(false);
    }
  };

  const onClickUseProfileAddress = (e) => {
    setUseProfileAddress(e.target.checked);
    if (e.target.checked) {
      setPreviousAddress({
        phoneNumber: getValues("phoneNumber"),
        email: getValues("email"),
        address: getValues("address"),
        telegramUsername: getValues("telegramUsername"),
      });
      setValue("phoneNumber", contactAddress.phoneNumber);
      setValue("email", contactAddress.email);
      setValue("address", contactAddress.address);
      setValue("telegramUsername", contactAddress.telegramUsername);
    } else {
      setValue("phoneNumber", previousAddress.phoneNumber);
      setValue("email", previousAddress.email);
      setValue("address", previousAddress.address);
      setValue("telegramUsername", previousAddress.telegramUsername);
    }
  };

  const watchAllFields = watch();
  console.log("watchAllFields", watchAllFields);

  const onSelectMultipleFile = (e) => {
    let fileObj = [];
    let fileArray = [];
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setSelectedMultipleFile(fileObj);
    setPreviewMultiple(fileArray);
  };

  const [categoriesData, setCategoriesData] = useState({});
  const [categoriesloading, setCategoriesLoading] = useState({
    isLoading: false,
    state: "success",
    message: "",
  });
  const { categories } = useSelector((state) => {
    return {
      categories: state.product.categories,
    };
  });
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

  useEffect(() => {
    if (!categories) {
      loadCategories();
    }
  }, []);
  useEffect(() => {
    if (categories) {
      setCategoriesData(categoryParser(categories));
    }
  }, [categories]);
  useEffect(() => {
    if (product) {
      [
        "productName",
        "brand",
        "category",
        "subCategory",
        "currentPrice",
        "price",
        "discription",
      ].map((name) => {
        if (product[name]) {
          setValue(name, product[name]);
        }
      });
      if (product.images) {
        let pastImages = {};
        let pastImages2 = {};
        product.images.map((image, index) => {
          pastImages[index] = {
            preview: image,
            file: null,
            new: false,
          };
          pastImages2[index] = image;
        });
        setPreviousImages2(pastImages2);
        console.log("pastImages", pastImages);
        setPreviousImages({ ...previousImages, ...pastImages });
      }
      ["phoneNumber", "email", "address", "telegramUsername"].map((contact) => {
        if (product.contacts && product.contacts[contact]) {
          setValue(contact, product.contacts[contact]);
        }
      });
    }
  }, [product]);

  const [productImageDelete, setProductImageDelete] = useState({
    isLoading: false,
    state: "success",
    message: "",
  });
  const onClickDeleteImage = async (imageUrl, index) => {
    setProductImageDelete({
      isLoading: true,
      state: "success",
      message: "",
    });
    try {
      const res = await api_deleteProductImage(
        product._id,
        imageUrl,
        auth.user.accesstoken
      );
      setPreviousImages({
        ...previousImages,
        [index]: null,
      });
      setProductImageDelete({
        isLoading: false,
        state: "success",
        message: "Image deleted succefully",
      });
    } catch (error) {
      console.log("error: ", error);
      setProductImageDelete({
        isLoading: false,
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while deleting product image!",
      });
    }
  };
  const onSelectImageFile = (e, id) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreviousImages({
      ...previousImages,
      [id]: {
        preview: objectUrl,
        file: e.target.files[0],
        new: true,
      },
    });
  };
  const [productImageUpload, setProductImageUpload] = useState({
    isLoading: false,
    state: "success",
    message: "",
  });
  const onUploadImage = async (imageUrl, index) => {
    setProductImageUpload({
      isLoading: true,
      state: "success",
      message: "",
    });
    try {
      var formData = new FormData();
      formData.append("images", imageUrl.file);
      formData.append("position", index);
      formData.append("url", previousImages2[index]);
      const res = await api_editProductImage(product._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: auth.user.accesstoken,
        },
      });
      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      /* setPreviousImages({
        ...previousImages,
        [index]: null,
      }); */
      setProductImageUpload({
        isLoading: false,
        state: "success",
        message: "Image uploaded succefully",
      });
    } catch (error) {
      console.log("error: ", error);
      toast.error("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setProductImageUpload({
        isLoading: false,
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while uploading product image!",
      });
    }
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Edit Product</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Product Detail</h3>
                <form className="form" /*  onSubmit={handleSubmit(onSubmit)} */>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Product Name"
                        type="text"
                        name="productName"
                        {...register("productName", {
                          required: true,
                          maxLength: 60,
                        })}
                      />
                      {errors.productName &&
                        errors.productName.type === "required" && (
                          <p className="message message--error">
                            Product name is required
                          </p>
                        )}
                      {errors.productName &&
                        errors.productName.type === "maxLength" && (
                          <p className="message message--error">
                            Product name must have less than 60 characters
                          </p>
                        )}
                    </div>
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Product Brand"
                        type="text"
                        name="brand"
                        {...register("brand", {
                          required: true,
                          maxLength: 60,
                        })}
                      />
                      {errors.brand && errors.brand.type === "required" && (
                        <p className="message message--error">
                          Product brand is required
                        </p>
                      )}
                      {errors.brand && errors.brand.type === "maxLength" && (
                        <p className="message message--error">
                          Product brand must have less than 60 characters
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Current Product Price"
                        type="number"
                        name="currentPrice"
                        {...register("currentPrice", {
                          required: true,
                          minLength: 1,
                        })}
                      />
                      {errors.currentPrice &&
                        errors.currentPrice.type === "required" && (
                          <p className="message message--error">
                            Current Product price is required
                          </p>
                        )}
                      {errors.currentPrice &&
                        errors.currentPrice.type === "minLength" && (
                          <p className="message message--error">
                            Current Product price must be atleast 1 birr
                          </p>
                        )}
                    </div>
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Previous Product Price"
                        type="number"
                        name="price"
                        {...register("price", {
                          required: true,
                          minLength: 1,
                        })}
                      />
                      {errors.price && errors.price.type === "required" && (
                        <p className="message message--error">
                          Product price is required
                        </p>
                      )}
                      {errors.price && errors.price.type === "minLength" && (
                        <p className="message message--error">
                          Product price must be atleast 1 birr
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          placeholder="Product Category"
                          disabled={addingProduct}
                          className="form__input form__input--sm"
                          name="category"
                          {...register("category", {
                            required: true,
                            maxLength: 60,
                          })}
                        >
                          <option>Product Category</option>
                          {Object.keys(categoriesData).map((key) => {
                            const category = categoriesData[key];
                            return (
                              <option value={category.value}>
                                {category.label}
                              </option>
                            );
                          })}
                        </select>
                        {errors.category &&
                          errors.category.type === "required" && (
                            <p className="message message--error">
                              Product category is required
                            </p>
                          )}
                        {errors.category &&
                          errors.category.type === "maxLength" && (
                            <p className="message message--error">
                              Product category must have less than 60 characters
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          placeholder="Product subcategory"
                          disabled={addingProduct}
                          className="form__input form__input--sm"
                          name="subCategory"
                          {...register("subCategory", {
                            required: true,
                            maxLength: 60,
                          })}
                        >
                          <option>Product Category</option>
                          {categoriesData &&
                            categoriesData[watchAllFields.category] &&
                            categoriesData[
                              watchAllFields.category
                            ].subCategory.map((subCategory) => {
                              return (
                                <option value={subCategory}>
                                  {subCategory}
                                </option>
                              );
                            })}
                        </select>
                        {errors.subCategory &&
                          errors.subCategory.type === "required" && (
                            <p className="message message--error">
                              Product subcategory is required
                            </p>
                          )}
                        {errors.subCategory &&
                          errors.subCategory.type === "maxLength" && (
                            <p className="message message--error">
                              Product subcategory must have less than 60
                              characters
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="form__input-row">
                    <div className="form__col">
                      <textarea
                        rows={4}
                        disabled={addingProduct}
                        className="form__input-textarea form__input--sm"
                        placeholder="Enter product discription here..."
                        type="text"
                        name="discription"
                        {...register("discription", {
                          required: true,
                          maxLength: 1000,
                        })}
                      ></textarea>
                      {errors.discription &&
                        errors.discription.type === "required" && (
                          <p className="message message--error">
                            Product discription is required
                          </p>
                        )}
                      {errors.discription &&
                        errors.discription.type === "maxLength" && (
                          <p className="message message--error">
                            Product discription must have less than 1000
                            characters
                          </p>
                        )}
                    </div>
                  </div>
                </form>
              </div>

              <div className="block">
                <h3 className="block__title">Contact Address Detail</h3>
                <form className="form" /*  onSubmit={handleSubmit(onSubmit)} */>
                  <div className="checkbox-wrapper">
                    <label
                      htmlFor="check-signed-in"
                      className={`checkbox checkbox--sm`}
                    >
                      <input
                        disabled={addingProduct}
                        type="checkbox"
                        name="keepSigned"
                        id="check-signed-in"
                        value={useProfileAddress}
                        onChange={(e) => onClickUseProfileAddress(e)}
                        /* {...register("keepSigned", {
                        required: true,
                      })} */
                      />
                      <span className="checkbox__check"></span>
                      <p>Use my profile address</p>
                    </label>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Phone Number"
                        type="number"
                        name="phoneNumber"
                        {...register("phoneNumber", {
                          required: true,
                          maxLength: 16,
                        })}
                      />
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "required" && (
                          <p className="message message--error">
                            Phone number is required
                          </p>
                        )}
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "maxLength" && (
                          <p className="message message--error">
                            Enter valid phone number
                          </p>
                        )}
                    </div>

                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Email (optional)"
                        type="text"
                        name="email"
                        {...register("email", {
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          maxLength: 50,
                        })}
                      />
                      {errors.email && errors.email.type === "maxLength" && (
                        <p className="message message--error">
                          Email is too long!
                        </p>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <p className="message message--error">
                          Please write a valid email
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Physical Address"
                        type="text"
                        name="address"
                        {...register("address", {
                          maxLength: 100,
                        })}
                      />
                      {errors.address &&
                        errors.address.type === "minLength" && (
                          <p className="message message--error">
                            Address must be less than 100 characters
                          </p>
                        )}
                    </div>
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Telegram Username"
                        type="text"
                        name="telegramUsername"
                        {...register("telegramUsername", {
                          maxLength: 100,
                        })}
                      />
                      {errors.telegramUsername &&
                        errors.telegramUsername.type === "minLength" && (
                          <p className="message message--error">
                            Username must be less than 100 characters
                          </p>
                        )}
                    </div>
                  </div>

                  {/* <button
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                    disabled={addingProduct}
                  >
                    {addingProduct ? "Signing in" : "Sign in"}
                  </button> */}
                </form>
              </div>

              <div className="block">
                <h3 className="block__title">Product Images</h3>
                <form className="form">
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        style={{ paddingTop: "13px" }}
                        type="file"
                        accept="image/*"
                        name="productImage"
                        onChange={(e) => onSelectImageFile(e, 0)}
                      />
                    </div>
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        style={{ paddingTop: "13px" }}
                        type="file"
                        accept="image/*"
                        name="productImageCollection"
                        multiple={true}
                        onChange={onSelectMultipleFile}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="block">
                <div className="add-product-gallery__thumbs">
                  {[0, 1, 2, 3].map((key) => (
                    <div key={preview} className="add-product-gallery__thumb">
                      {previousImages[key + 1].preview &&
                        !previousImages[key + 1].new && (
                          <button
                            disabled={productImageDelete.isLoading}
                            type="button"
                            onClick={() =>
                              onClickDeleteImage(
                                previousImages[key + 1],
                                key + 1
                              )
                            }
                            className={`btn-delete`}
                          >
                            X
                          </button>
                        )}
                      {previousImages[key + 1].new && (
                        <button
                          disabled={productImageDelete.isLoading}
                          type="button"
                          onClick={() =>
                            onUploadImage(previousImages[key + 1], key + 1)
                          }
                          className={`btn-upload btn--rounded-upload btn--yellow-upload`}
                        >
                          save
                        </button>
                      )}
                      <button type="button" className={`btn-add`}>
                        <input
                          disabled={addingProduct}
                          className="form__input form__input--sm"
                          style={{ paddingTop: "13px", display: "none" }}
                          type="file"
                          accept="image/*"
                          name="productImage"
                          onChange={(e) => onSelectImageFile(e, key + 1)}
                          id={`image-input${key}`}
                        />
                        <label for={`image-input${key}`}>+</label>
                      </button>
                      <img
                        src={
                          previousImages[key + 1].new
                            ? previousImages[key + 1].preview
                            : previousImages[key + 1].preview
                            ? `${server}/${previousImages[key + 1].preview}`
                            : null
                        }
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Product colors</h3>
                <div className="products-filter__block">
                  <div className="products-filter__block__content">
                    {productsColors.map((productsColor) => (
                      <div className="checkbox-color-wrapper">
                        {productsColor.map((type) => (
                          <CheckboxColor
                            key={type.id}
                            name="product-color"
                            color={type.color}
                            onChange={(value) => {
                              addProductVariant(
                                "colors",
                                type.color,
                                value.target.checked
                              );
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="block">
                <h3 className="block__title">Product sizes</h3>
                {productsSizes.map((productsSize) => (
                  <div className="products-filter__block__content checkbox-square-wrapper">
                    {productsSize.map((type) => (
                      <Checkbox
                        type="square"
                        key={type.id}
                        name="product-size"
                        label={type.label}
                        onChange={(value) => {
                          addProductVariant(
                            "sizes",
                            type.label,
                            value.target.checked
                          );
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* <div className="block">
                <h3 className="block__title">Tags</h3>
                <ul className="round-options round-options--two">
                  <li className="round-item round-item--bg">
                    <p>New</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <p>Used</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <p>Slightly Used</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <p>Sells</p>
                  </li>
                </ul>
              </div>

              <div className="block">
                <h3 className="block__title">Post type</h3>
                <ul className="round-options round-options--two">
                  <li className="round-item round-item--bg">
                    <p>featured Post</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <p>Normal Post</p>
                  </li>
                </ul>
              </div> */}
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Product Preview</h3>
                <ProductItemLoading
                  discount={watchAllFields.price}
                  productImage={
                    previousImages[0].new
                      ? previousImages[0].preview
                      : previousImages[0].preview
                      ? `${server}/${previousImages[0].preview}`
                      : null
                  }
                  name={watchAllFields.productName}
                  price={watchAllFields.price}
                  currentPrice={watchAllFields.price}
                />
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <a
              onClick={onClickBack}
              style={{ cursor: "pointer" }}
              className="cart__btn-back"
            >
              <i className="icon-left"></i> Back
            </a>
            <div className="cart-actions__items-wrapper">
              {/* <button type="button" className="btn btn--rounded btn--border">
                Continue shopping
              </button> */}
              <button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="btn btn--rounded btn--yellow"
                disabled={addingProduct}
              >
                {addingProduct ? "Submiting Form" : "Submit Form"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AddProductPage;
