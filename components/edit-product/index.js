import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// Cpmponents
import Layout from "../../layouts/Main";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import ProductItemLoading from "../../components/product-item/edit-product-preview";
import Toast from "../Utils/Toast";

// Services
import { useForm } from "react-hook-form";
import { server } from "../../utils/server";

// APIs
import {
  api_getAllCategories,
  api_deleteProductImage,
  api_editProduct,
  api_addProductImage,
  api_editProductImage,
  api_updateProductPaymentStatus,
} from "../../api/index";

// Redux
import {
  clearProducts,
  clearCategories,
  setCategories,
} from "../../store/actions/productActions";

// Utils
import { numberOfDaysInInterval } from "../../utils/date/numberOfDays";

const initialImagesState = {
  0: {
    preview: null,
    image: null,
    file: null,
  },
  1: {
    preview: null,
    image: null,
    file: null,
  },
  2: {
    preview: null,
    image: null,
    file: null,
  },
  3: {
    preview: null,
    image: null,
    file: null,
  },
  4: {
    preview: null,
    image: null,
    file: null,
  },
};

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

const AddProductPage = ({ oldProduct, onClickBack }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // use Selectors
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile.profile);

  // Use States
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(oldProduct);
  const [addingProduct, setAddingProduct] = useState(false);
  const [isFeatured, setIsFeatured] = useState(
    product && product.postType === "Featured" ? true : false
  );
  const [useProfileAddress, setUseProfileAddress] = useState(true);
  const [previousAddress, setPreviousAddress] = useState({
    phoneNumber: oldProduct.contacts ? oldProduct.contacts.phoneNumber : "",
    address: oldProduct.contacts ? oldProduct.contacts.address : "",
    telegramUsername: oldProduct.contacts
      ? oldProduct.contacts.telegramUsername
      : "",
    facebook: oldProduct.contacts ? oldProduct.contacts.facebook : "",
    whatsapp: oldProduct.contacts ? oldProduct.contacts.whatsapp : "",
  });
  const [previousImages, setPreviousImages] = useState(initialImagesState);

  const [selectedCategory, setSelectedCategory] = useState({
    category: oldProduct.category,
    subCategory: oldProduct.subCategory,
    brand: oldProduct.brand,
    model: oldProduct.model,
  });
  const [categoriesData, setCategoriesData] = useState({});
  const [categoriesloading, setCategoriesLoading] = useState(false);
  const [payFor, setPayFor] = useState(1);

  // user contacts
  const contactAddress = {
    phoneNumber: "",
    address: "",
    telegramUsername: "",
    facebook: "",
    whatsapp: "",
  };

  const clearPreviousData = () => {
    dispatch(clearProducts());
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
    try {
      const contacts = {
        phoneNumber: data.phoneNumber,
        address: data.address,
        telegramUsername: data.telegramUsername,
        facebook: data.facebook,
        whatsapp: data.whatsapp,
      };
      const uploadedData = {
        contacts: contacts,
        userId: auth.user.id,
        productName: data.productName,
        category: selectedCategory.category,
        subCategory: selectedCategory.subCategory,
        brand: selectedCategory.brand,
        model: selectedCategory.model,
        currentPrice: data.currentPrice,
        price: data.price,
        discription: data.discription,
        postType: isFeatured ? "Featured" : "Normal",
      };
      const res = await api_editProduct(product._id, uploadedData, {
        headers: {
          Authorization: auth.user.accesstoken,
        },
      });

      setAddingProduct(false);
      Toast("success", res.data.msg);
      clearPreviousData();
      onClickBack();
    } catch (error) {
      Toast("error", error.response.data.msg);
      console.log("error: ", error);
      setAddingProduct(false);
    }
  };

  const onClickUseProfileAddress = (e) => {
    setUseProfileAddress(e.target.checked);
    if (!e.target.checked) {
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
        product.images.map((image, index) => {
          pastImages[index] = {
            preview: `${server}/${image}`,
            image,
            file: null,
          };
        });
        setPreviousImages({ ...initialImagesState, ...pastImages });
      }
      [
        "phoneNumber",
        "address",
        "telegramUsername",
        "facebook",
        "whatsapp",
      ].map((contact) => {
        if (product.contacts && product.contacts[contact]) {
          setValue(contact, product.contacts[contact]);
        }
      });
      setIsFeatured(product.postType === "Featured" ? true : false);
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
      const newProduct = res.data ? res.data.data : null;
      console.log("newProduct", newProduct);
      reRenderImagePreview(newProduct);
      setProductImageDelete({
        isLoading: false,
        state: "success",
        message: "Image deleted succefully",
      });
      toast.success("Image deleted succefully!", {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearPreviousData();
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
      toast.error("Product image delete error!", {
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

  const onSelectImageFile = (e, id) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreviousImages({
      ...previousImages,
      [id]: {
        ...previousImages[id],
        preview: objectUrl,
        file: e.target.files[0],
      },
    });
  };

  const onUploadImage = async (imageUrl, index) => {
    try {
      var formData = new FormData();
      if (imageUrl.image) {
        formData.append("image", imageUrl.file);
        formData.append("url", imageUrl.image);
        formData.append("position", index);
      } else {
        formData.append("image", imageUrl.file);
      }
      const res = imageUrl.image
        ? await api_editProductImage(product._id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: auth.user.accesstoken,
            },
          })
        : await api_addProductImage(product._id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: auth.user.accesstoken,
            },
          });
      const newProduct = res.data ? res.data.data : null;
      reRenderImagePreview(newProduct);
      Toast("success", "Image saved succefully!");
      clearPreviousData();
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  const reRenderImagePreview = (newProduct) => {
    if (newProduct && newProduct.images) {
      console.log("newProduct.images", newProduct.images);
      setProduct({
        ...product,
        images: newProduct.images,
      });
    }
  };

  const updateProductPaymentStatus = async () => {
    try {
      const res = await api_updateProductPaymentStatus(
        oldProduct._id,
        Number(payFor),
        auth.user.accesstoken
      );
      setShowModal(false);
      Toast("success", res.data.msg);
      router.push("/products");
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Edit Product</h3>
            <div>
              <a
                onClick={onClickBack}
                style={{ cursor: "pointer" }}
                className="cart__btn-back"
              >
                <i className="icon-left"></i> Back
              </a>
            </div>
          </div>

          <div className="checkout-content">
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
                          })}
                        >
                          <option value="">Product category</option>
                          {Object.keys(categoriesData).map((key) => {
                            const category = categoriesData[key];
                            return (
                              <option key={key} value={category.value}>
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
                                <option key={index} value={subCategory.id}>
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
                                if (sub.id === selectedCategory.subCategory) {
                                  return sub.brands.map((brand, bi) => {
                                    return (
                                      <option key={bi} value={brand.id}>
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
                              maxLength: 60,
                            })}
                          >
                            <option>Model</option>
                            {categoriesData &&
                              categoriesData[watchAllFields.category] &&
                              categoriesData[
                                watchAllFields.category
                              ].subCategory.map((sub, index) => {
                                if (sub.id === selectedCategory.subCategory) {
                                  return sub.brands.map((brand, i) => {
                                    console.log(selectedCategory.brand);
                                    if (brand.id === selectedCategory.brand) {
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
                          maxLength: 15,
                        })}
                      />
                    </div>

                    <div className="form__col">
                      <input
                        disabled={addingProduct}
                        className="form__input form__input--sm"
                        placeholder="0.00 ETB"
                        type="number"
                        name="currentPrice"
                        {...register("currentPrice")}
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
                          maxLength: 1000,
                        })}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="block">
                <h3 className="block__title">Product Images</h3>
                <div className="add-product-gallery__thumbs">
                  {[0, 1, 2, 3].map((key) => (
                    <div
                      key={`preview${key}`}
                      className="add-product-gallery__thumb"
                    >
                      {previousImages[key + 1].preview &&
                        !previousImages[key + 1].file && (
                          <button
                            disabled={productImageDelete.isLoading}
                            type="button"
                            onClick={() =>
                              onClickDeleteImage(
                                previousImages[key + 1].image,
                                key + 1
                              )
                            }
                            className={`btn-delete`}
                          >
                            X
                          </button>
                        )}
                      {previousImages[key + 1].file && (
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
                          previousImages[key + 1].preview
                            ? previousImages[key + 1].preview
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
                          checked={useProfileAddress}
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
                            maxLength: 16,
                          })}
                        />
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
                        value={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        checked={isFeatured}
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
                <h3 className="block__title">Product Preview</h3>
                <ProductItemLoading
                  discount={watchAllFields.price}
                  productImage={
                    previousImages[0].preview ? previousImages[0].preview : null
                  }
                  name={watchAllFields.productName}
                  price={watchAllFields.price}
                  currentPrice={watchAllFields.currentPrice}
                  previousImages={previousImages}
                  productImageDelete={productImageDelete}
                  onClickDeleteImage={onClickDeleteImage}
                  onUploadImage={onUploadImage}
                  addingProduct={addingProduct}
                  onSelectImageFile={onSelectImageFile}
                />
              </div>

              {(oldProduct.postPayment == 0 ||
                numberOfDaysInInterval(
                  new Date(),
                  new Date(oldProduct.postExpireDate)
                ) <= 5) && (
                <div className="cart-actions__items-wrapper">
                  <button
                    type="button"
                    className="btn btn--rounded btn--border btn--call"
                    onClick={() => setShowModal(true)}
                  >
                    Pay post fee
                  </button>
                </div>
              )}
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
      {showModal && (
        <PaymentModal
          category={selectedCategory.category}
          payFor={payFor}
          setPayFor={setPayFor}
          showModal={showModal}
          setShowModal={setShowModal}
          updateProductPaymentStatus={updateProductPaymentStatus}
          product={product}
        />
      )}
    </Layout>
  );
};

export default AddProductPage;
