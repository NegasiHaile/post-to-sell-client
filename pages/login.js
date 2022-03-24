import { useState } from "react";
import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";

const LoginPage = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [result, setResult] = useState({ state: "success", message: "" });
  //const { register, handleSubmit, errors } = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSigningIn(true);
    try {
      const res = await postData(`${server}/api/login`, {
        email: data.email,
        password: data.password,
      });
      setResult({
        state: "success",
        message: "succefully signed in!",
      });
      setSigningIn(false);
    } catch (error) {
      setResult({
        state: "error",
        message: error.message
          ? error.message
          : "something went wrong while signing in!",
      });
      setSigningIn(false);
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to store
              </a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Log in</h2>
            <p className="form-block__description">Login to your Account</p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
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
                  <p className="message message--error">Username is required</p>
                )}
              </div>

              <div className="form__input-row">
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

              <div className="form__info">
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
                      /* {...register("keepSigned", {
                        required: true,
                      })} */
                    />
                    {/* <input
                      type="checkbox"
                      name="keepSigned"
                      id="check-signed-in"
                      ref={register({ required: false })}
                    /> */}
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
              </div>

              {/* <div className="form__btns">
                <button type="button" className="btn-social fb-btn">
                  <i className="icon-facebook"></i>Facebook
                </button>
                <button type="button" className="btn-social google-btn">
                  <img src="/images/icons/gmail.svg" alt="gmail" /> Gmail
                </button>
              </div> */}

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                disabled={signingIn}
              >
                {signingIn?"Signing in":"Sign in"}
              </button>

              <p className="form__signup-link">
                Not a member yet? <a href="/register">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;