import { useState } from "react";
import Layout from "../../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../../utils/server";
import { postData } from "../../utils/services";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signinSuccess, signoutSuccess } from "../../store/actions/authActions";
import { setProfile } from "../../store/actions/profileActions";

const LoginPage = ({ show }) => {
  const style = {
    display: show ? "flex" : "none",
  };
  const dispatch = useDispatch();
  const [signingIn, setSigningIn] = useState(false);
  const [result, setResult] = useState({ state: "success", message: "" });

  const {
    register,
    handleSubmit,
    watch,
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
  return (
    <section style={style} className="add-product-form-page">
      <div className="add-product-form-block">
        <h2 className="form-block__title">Add Product</h2>
        {/*  <p className="form-block__description">Login to your Account</p> */}
        <div className="add-product-page-blocks-wrapper">
          <div className="add-product-page-left-blocks">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="add-product-form-inputs-wrapper">
                <div
                  className="form__input-row-full-width"
                  style={{ marginRight: 20 }}
                >
                  <input
                    disabled={signingIn}
                    className="form__input"
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

                <div
                  className="form__input-row-full-width"
                  style={{ marginRight: 20 }}
                >
                  <input
                    disabled={signingIn}
                    className="form__input"
                    placeholder="Username"
                    type="text"
                    name="username"
                    {...register("username", {
                      required: true,
                      minLength: 8,
                      maxLength: 8,
                    })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p className="message message--error">
                      Username is required
                    </p>
                  )}
                </div>

                <div className="form__input-row-full-width">
                  <input
                    disabled={signingIn}
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="message message--error">
                      Password must have atleast 8 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="add-product-form-inputs-wrapper">
                <div className="form__input-row-full-width add-product-input-margin">
                  <input
                    disabled={signingIn}
                    className="form__input"
                    placeholder="Username"
                    type="text"
                    name="username"
                    {...register("username", {
                      required: true,
                    })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p className="message message--error">
                      Username is required
                    </p>
                  )}
                </div>

                <div className="form__input-row-full-width">
                  <input
                    disabled={signingIn}
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="message message--error">
                      Password must have atleast 8 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="add-product-form-inputs-wrapper">
                <div className="form__input-row-full-width add-product-input-margin">
                  <input
                    disabled={signingIn}
                    className="form__input"
                    placeholder="Username"
                    type="text"
                    name="username"
                    {...register("username", {
                      required: true,
                    })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p className="message message--error">
                      Username is required
                    </p>
                  )}
                </div>

                <div className="form__input-row-full-width">
                  <input
                    disabled={signingIn}
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="message message--error">
                      Password must have atleast 8 characters
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="form__info">
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
                    {...register("keepSigned", {
                      required: true,
                    })}
                  />

                  <span className="checkbox__check"></span>
                  <p>Keep me signed in</p>
                </label>
              </div>
              <a
                href="/forgot-password"
                className="form__info__forgot-password"
              >
                Forgot password?
              </a>
            </div> */}

              {/* <div className="form__btns">
                <button type="button" className="btn-social fb-btn">
                  <i className="icon-facebook"></i>Facebook
                </button>
                <button type="button" className="btn-social google-btn">
                  <img src="/images/icons/gmail.svg" alt="gmail" /> Gmail
                </button>
              </div> */}

              {/* <button
              type="submit"
              className="btn btn--rounded btn--yellow btn-submit"
              disabled={signingIn}
            >
              {signingIn ? "Signing in" : "Sign in"}
            </button>

            <p className="form__signup-link">
              Not a member yet? <a href="/register">Sign up</a>
            </p> */}
            </form>
          </div>
          <div className="add-product-page-right-blocks">
            <p>some thing</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
