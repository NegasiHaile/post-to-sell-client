import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// APIs
import {
  api_getAllCategories,
  api_updateProductPaymentStatus,
} from "../../api/index";

import Layout from "../../layouts/Main";
import CheckoutStatus from "../../components/checkout-status";

import { server } from "../../utils/server";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductItemLoading from "../../components/product-item/add-product-preview";

import {
  clearProducts,
  clearCategories,
  setCategories,
} from "../../store/actions/productActions";

import PaymentModal from "../../components/PaymentModal/PaymentModal";

const categoryParser = (categories) => {
  let result = {};
  if (categories) {
    categories.map((category) => {
      result[category._id] = {
        label: category.category,
        value: category._id,
        subCategory: category.subCategory,
        postFee: category.postFee,
      };
    });
  }
  return result;
};

const AddProductPage = () => {
  const dispatch = useDispatch();
  const { userProfile, auth } = useSelector((state) => {
    return {
      userProfile: state.profile.profile,
      auth: state.auth,
    };
  });

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [result, setResult] = useState({ state: "success", message: "" });
  const [isFeachered, setIsFeachered] = useState(false);

  const [useProfileAddress, setUseProfileAddress] = useState(false);
  const [previousAddress, setPreviousAddress] = useState({
    phoneNumber: "",
    address: "",
    telegramUsername: "",
    facebook: "",
    whatsapp: "",
  });

  const [selectedFile, setSelectedFile] = useState();
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

  const [selectedCategory, setSelectedCategory] = useState({
    category: "",
    subCategory: "",
    brand: "",
    model: "",
  });

  const [responsedProductData, setResponsedProductData] = useState({});
  const [payFor, setPayFor] = useState(1);

  const contactAddress = {
    phoneNumber: userProfile?.phone ? userProfile.phone : "",
    address: userProfile?.address ? userProfile.address : "",
    telegramUsername: userProfile?.contacts.telegram
      ? userProfile?.contacts.telegram
      : "",
    facebook: userProfile?.contacts.facebook
      ? userProfile?.contacts.facebook
      : "",
    whatsapp: userProfile?.contacts.whatsapp
      ? userProfile?.contacts.whatsapp
      : "",
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
    if (selectedFile) {
      setAddingProduct(true);
      try {
        // Contacts assigned to the product
        const contacts = {
          phoneNumber: data.phoneNumber,
          address: data.address,
          telegramUsername: data.telegramUsername,
          facebook: data.facebook,
          whatsapp: data.whatsapp,
        };

        var formData = new FormData();
        formData.append("images", selectedFile);
        for (let i = 0; i < selectedMultipleFile[0].length; i++) {
          formData.append("images", selectedMultipleFile[0][i]);
        }

        for (let contactsKey in contacts) {
          formData.append(`contacts[${contactsKey}]`, contacts[contactsKey]);
        }
        formData.append("userId", auth.user.id);
        formData.append("productName", data.productName);
        formData.append("brand", selectedCategory.brand);
        formData.append("model", data.model);
        formData.append("category", data.category);
        formData.append("subCategory", selectedCategory.subCategory);
        formData.append("currentPrice", data.currentPrice);
        formData.append("discription", data.discription);
        formData.append("postType", isFeachered ? "Featured" : "Normal");

        const res = await axios.post(`${server}/api/products/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth.user.accesstoken,
          },
        });
        setResult({
          state: "success",
          message: "Product added succefully!",
        });
        const responseData = res.data;
        setAddingProduct(false);
        toast.success("Product added succefully!", {
          position: "top-right",
          theme: "colored",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(clearProducts());
        setResponsedProductData(res.data.product);
        setShowModal(true);
      } catch (error) {
        console.log("error: ", error);
        setResult({
          state: "error",
          message:
            error.response && error.response.data && error.response.data.msg
              ? error.response.data.msg
              : "something went wrong while signing in!",
        });
        setAddingProduct(false);
        toast.error("Product adding error!", {
          position: "top-right",
          theme: "colored",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      setResult({
        state: "error",
        message: "primary image is required!",
      });
      toast.error("primary image is required!", {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onClickUseProfileAddress = (e) => {
    setUseProfileAddress(e.target.checked);
    if (e.target.checked) {
      setPreviousAddress({
        phoneNumber: getValues("phoneNumber"),
        address: getValues("address"),
        telegramUsername: getValues("telegramUsername"),
        facebook: getValues("facebook"),
        whatsapp: getValues("whatsapp"),
      });
      setValue("phoneNumber", contactAddress.phoneNumber);
      setValue("address", contactAddress.address);
      setValue("telegramUsername", contactAddress.telegramUsername);
      setValue("facebook", contactAddress.facebook);
      setValue("whatsapp", contactAddress.whatsapp);
    } else {
      setValue("phoneNumber", previousAddress.phoneNumber);
      setValue("address", previousAddress.address);
      setValue("telegramUsername", previousAddress.telegramUsername);
      setValue("facebook", previousAddress.facebook);
      setValue("whatsapp", previousAddress.whatsapp);
    }
  };

  const watchAllFields = watch();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const onSelectMultipleFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
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

  const updateProductPaymentStatus = async () => {
    try {
      const res = await api_updateProductPaymentStatus(
        responsedProductData._id,
        Number(payFor),
        auth.user.accesstoken
      );
      setShowModal(false);
      router.push("/users/my-products");
      toast.success(res.data.msg, {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Add Product</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            {/* Product detail  */}
            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Product detail</h3>
                <form className="form">
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          placeholder="Product category"
                          disabled={addingProduct}
                          className="form__input form__input--sm"
                          name="category"
                          {...register("category", {
                            required: true,
                            maxLength: 60,
                          })}
                        >
                          <option value="">Product category</option>
                          {Object.keys(categoriesData).map((key, index) => {
                            const category = categoriesData[key];
                            return (
                              <option key={index} value={category.value}>
                                {category.label}
                              </option>
                            );
                          })}
                          <option value="other">Other</option>
                        </select>
                        {errors.category &&
                          errors.category.type === "required" && (
                            <p className="message message--error">Required</p>
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
                          value={selectedCategory.subCategory}
                          onChange={(e) =>
                            setSelectedCategory({
                              ...selectedCategory,
                              subCategory: e.target.value,
                            })
                          }
                        >
                          <option>Sub category</option>
                          {categoriesData &&
                            categoriesData[watchAllFields.category] &&
                            categoriesData[
                              watchAllFields.category
                            ].subCategory.map((subCategory, index) => {
                              return (
                                <option
                                  key={index}
                                  value={subCategory.sub_name}
                                >
                                  {subCategory.sub_name}
                                </option>
                              );
                            })}
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    {selectedCategory.subCategory && (
                      <div className="form__col">
                        <div className="select-wrapper select-form">
                          <select
                            placeholder="Brand"
                            disabled={addingProduct}
                            className="form__input form__input--sm"
                            name="brand"
                            value={selectedCategory.brand}
                            onChange={(e) =>
                              setSelectedCategory({
                                ...selectedCategory,
                                brand: e.target.value,
                              })
                            }
                          >
                            <option>Brand</option>
                            {categoriesData &&
                              categoriesData[watchAllFields.category] &&
                              categoriesData[
                                watchAllFields.category
                              ].subCategory.map((sub, index) => {
                                if (
                                  sub.sub_name === selectedCategory.subCategory
                                ) {
                                  return sub.brands.map((brand, i) => {
                                    return (
                                      <option value={brand.brand_name}>
                                        {brand.brand_name}
                                      </option>
                                    );
                                  });
                                }
                              })}
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}
                    {selectedCategory.brand && (
                      <div className="form__col">
                        <div className="select-wrapper select-form">
                          <select
                            placeholder="Model"
                            disabled={addingProduct}
                            className="form__input form__input--sm"
                            name="model"
                            {...register("model", {
                              required: true,
                              maxLength: 60,
                            })}
                          >
                            <option>Model</option>
                            {categoriesData &&
                              categoriesData[watchAllFields.category] &&
                              categoriesData[
                                watchAllFields.category
                              ].subCategory.map((sub, index) => {
                                if (
                                  sub.sub_name === selectedCategory.subCategory
                                ) {
                                  return sub.brands.map((brand, i) => {
                                    console.log(selectedCategory.brand);
                                    if (
                                      brand.brand_name ===
                                      selectedCategory.brand
                                    ) {
                                      return brand.models.map((model, mi) => {
                                        return (
                                          <option key={mi} value={model}>
                                            {model}
                                          </option>
                                        );
                                      });
                                    }
                                  });
                                }
                              })}
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Product name"
                        type="text"
                        name="productName"
                        {...register("productName", {
                          required: true,
                          maxLength: 60,
                        })}
                      />
                      {errors.productName &&
                        errors.productName.type === "required" && (
                          <small className="message message--error">
                            Product name is required
                          </small>
                        )}
                    </div>

                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="Price"
                        type="number"
                        name="currentPrice"
                        {...register("currentPrice", {
                          required: true,
                          minLength: 1,
                        })}
                      />
                      {errors.currentPrice &&
                        errors.currentPrice.type === "required" && (
                          <small className="message message--error">
                            Price is required
                          </small>
                        )}
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
                <h3 className="block__title">Product images</h3>
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
                        onChange={onSelectFile}
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
                      <img
                        src={
                          previewMultiple.length > key
                            ? previewMultiple[key]
                            : null
                        }
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User contact  */}
            <div className="checkout__col-4">
              <div className="block">
                <div className="block">
                  <h3 className="block__title">Contact address detail</h3>
                  <form className="form">
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
                        />
                        <span className="checkbox__check"></span>
                        <p>Use my profile address</p>
                      </label>
                    </div>

                    <div className="form__input-row">
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
                    </div>
                    <div className="form__input-row">
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
                    </div>
                    <div className="form__input-row">
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
                    <div className="form__input-row">
                      <div className="form__col">
                        <input
                          disabled={addingProduct}
                          className="form__input form__input--sm"
                          placeholder="Facebook url"
                          type="text"
                          name="facebook"
                          {...register("facebook", {
                            maxLength: 100,
                          })}
                        />
                      </div>
                    </div>
                    <div className="form__input-row">
                      <div className="form__col">
                        <input
                          disabled={addingProduct}
                          className="form__input form__input--sm"
                          placeholder="whatsapp number"
                          type="text"
                          name="whatsapp"
                          {...register("whatsapp", {
                            maxLength: 100,
                          })}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <h3 className="block__title">Post type</h3>
                <form className="form">
                  <div className="checkbox-wrapper">
                    <label
                      htmlFor="check-signed-in2"
                      className={`checkbox checkbox--sm`}
                    >
                      <input
                        disabled={addingProduct}
                        type="checkbox"
                        name="keepSigned"
                        id="check-signed-in2"
                        value={isFeachered}
                        onChange={(e) => setIsFeachered(e.target.checked)}
                      />
                      <span className="checkbox__check"></span>
                      <p>Add as featured product</p>
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Product preview</h3>
                <ProductItemLoading
                  discount={watchAllFields.price}
                  productImage={selectedFile ? preview : null}
                  name={watchAllFields.productName}
                  price={watchAllFields.price}
                  currentPrice={watchAllFields.currentPrice}
                />
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <a href="/products" className="cart__btn-back">
              <i className="icon-left"></i> Back
            </a>
            <div className="cart-actions__items-wrapper">
              <button
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="btn btn--rounded btn--yellow"
              >
                {addingProduct ? "Submiting Form" : "Submit Form"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <PaymentModal
          category={responsedProductData.category}
          payFor={payFor}
          setPayFor={setPayFor}
          showModal={showModal}
          setShowModal={setShowModal}
          updateProductPaymentStatus={updateProductPaymentStatus}
        />
      )}
    </Layout>
  );
};

export default AddProductPage;
