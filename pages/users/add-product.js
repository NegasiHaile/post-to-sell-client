/* import { useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import AddProduct from "../../components/add-product";

const Product = () => {
  const [showBlock, setShowBlock] = useState("description");

  return (
    <Layout>
      <Breadcrumb currentPage={`Products / Add product`} />

      <section className="add-product-page">
        <div className="container">
          <div className="add-product-page-header-select">
            <div className="add-product-page-header-select-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Product Form
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Product Preview
              </button>
            </div>
          </div>
          <AddProduct show={showBlock === "description"} />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Product;
 */

import { useState, useEffect } from "react";
import Layout from "../../layouts/Main";
import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";

import { useForm } from "react-hook-form";
import { server } from "../../utils/server";
import { postData } from "../../utils/services";
import axios from "axios";
import { useDispatch } from "react-redux";
import ProductItemLoading from "../../components/product-item/add-product-preview";

const categorys = [
  { label: "Category 1", value: "1" },
  { label: "Category 2", value: "2" },
  { label: "Category 3", value: "3" },
  { label: "Category 4", value: "4" },
  { label: "Category 5", value: "5" },
  { label: "Category 6", value: "6" },
  { label: "Category 7", value: "7" },
  { label: "Category 8", value: "8" },
  { label: "Category 9", value: "9" },
];

const subCategorys = [
  { label: "Sub Category 1", value: "1" },
  { label: "Sub Category 2", value: "2" },
  { label: "Sub Category 3", value: "3" },
  { label: "Sub Category 4", value: "4" },
  { label: "Sub Category 5", value: "5" },
  { label: "Sub Category 6", value: "6" },
  { label: "Sub Category 7", value: "7" },
  { label: "Sub Category 8", value: "8" },
  { label: "Sub Category 9", value: "9" },
];

const contactAddress = {
  phoneNumber: "0983339025",
  email: "yismawmintesnot@gmail.com",
  address: "addis ababa, 22",
  telegramUsername: "minoty",
};

const CheckoutPage = () => {
  const priceTotal = useSelector((state) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });

  const dispatch = useDispatch();
  const [signingIn, setSigningIn] = useState(false);
  const [result, setResult] = useState({ state: "success", message: "" });
  const [useProfileAddress, setUseProfileAddress] = useState(false);
  const [previousAddress, setPreviousAddress] = useState({
    phoneNumber: "",
    email: "",
    address: "",
    telegramUsername: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSigningIn(true);
    try {
      const res = await axios.post(`${server}/api/users/signin`, {
        email: data.username,
        password: data.password,
      });
      setResult({
        state: "success",
        message: "succefully signed in!",
      });
      const responseData = res.data;
      const authData = {
        accesstoken: responseData.accesstoken,
        refreshtoken: responseData.refreshtoken,
        id: responseData.profile._id,
        role: responseData.profile.role,
        accountStatus: responseData.profile.accountStatus,
      };
      dispatch(setProfile(responseData.profile));
      dispatch(signinSuccess(authData));
      setSigningIn(false);
    } catch (error) {
      console.log("error: ", error);
      setResult({
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while signing in!",
      });
      dispatch(signoutSuccess());
      setSigningIn(false);
    }
  };
  console.log("result", result);

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

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
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

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
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
            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Product Detail</h3>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={signingIn}
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
                      <div className="select-wrapper select-form">
                        <select
                          placeholder="Product Category"
                          disabled={signingIn}
                          className="form__input form__input--sm"
                          name="category"
                          {...register("category", {
                            required: true,
                            maxLength: 60,
                          })}
                        >
                          <option>Product Category</option>
                          {categorys.map((category) => {
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
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          placeholder="Product subcategory"
                          disabled={signingIn}
                          className="form__input form__input--sm"
                          name="subCategory"
                          {...register("subCategory", {
                            required: true,
                            maxLength: 60,
                          })}
                        >
                          <option>Product Category</option>
                          {subCategorys.map((subCategory) => {
                            return (
                              <option value={subCategory.value}>
                                {subCategory.label}
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

                    <div className="form__col">
                      <input
                        disabled={signingIn}
                        className="form__input form__input--sm"
                        placeholder="Product Price"
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
                  <div className="form__input-row">
                    <div className="form__col">
                      <textarea
                        rows={4}
                        disabled={signingIn}
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
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="checkbox-wrapper">
                    <label
                      htmlFor="check-signed-in"
                      className={`checkbox checkbox--sm`}
                    >
                      <input
                        disabled={signingIn}
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
                        disabled={signingIn}
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
                        disabled={signingIn}
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
                        disabled={signingIn}
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
                        disabled={signingIn}
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
                    disabled={signingIn}
                  >
                    {signingIn ? "Signing in" : "Sign in"}
                  </button> */}
                </form>
              </div>
              <div className="block">
                <h3 className="block__title">Product Images</h3>
                <form className="form">
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        disabled={signingIn}
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
                        disabled={signingIn}
                        className="form__input form__input--sm"
                        style={{ paddingTop: "13px" }}
                        type="file"
                        accept="image/*"
                        name="productImageCollection"
                        multiple={true}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Payment method</h3>
                <ul className="round-options round-options--three">
                  <li className="round-item">
                    <img src="/images/logos/paypal.png" alt="Paypal" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/visa.png" alt="Paypal" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/mastercard.png" alt="Paypal" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/maestro.png" alt="Paypal" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/discover.png" alt="Paypal" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/ideal-logo.svg" alt="Paypal" />
                  </li>
                </ul>
              </div>

              <div className="block">
                <h3 className="block__title">Delivery method</h3>
                <ul className="round-options round-options--two">
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/inpost.svg" alt="Paypal" />
                    <p>$20.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/dpd.svg" alt="Paypal" />
                    <p>$12.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/dhl.svg" alt="Paypal" />
                    <p>$15.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/maestro.png" alt="Paypal" />
                    <p>$10.00</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Product Preview</h3>
                <ProductItemLoading
                  discount={watchAllFields.price}
                  productImage={
                    selectedFile ? preview : null /* watchAllFields */
                  }
                  name={watchAllFields.productName}
                  price={watchAllFields.price}
                  currentPrice={watchAllFields.price}
                />
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <a href="/cart" className="cart__btn-back">
              <i className="icon-left"></i> Back
            </a>
            <div className="cart-actions__items-wrapper">
              {/* <button type="button" className="btn btn--rounded btn--border">
                Continue shopping
              </button> */}
              <button type="button" className="btn btn--rounded btn--yellow">
                Submit Form
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
