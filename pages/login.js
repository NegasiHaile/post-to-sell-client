import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signinSuccess, signoutSuccess } from "../store/actions/authActions";
import { setProfile } from "../store/actions/profileActions";
import { toast } from "react-toastify";
import { signOut } from "../components/SignOut";

const LoginPage = ({ title = "post to sell login" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
      localStorage.setItem("auth", JSON.stringify(authData));
      dispatch(setProfile(responseData.profile));
      dispatch(signinSuccess(authData));
      setSigningIn(false);
      toast.success("Signed in succefully!", {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/products");
    } catch (error) {
      setResult({
        state: "error",
        message:
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "something went wrong while signing in!",
      });
      /* dispatch(signoutSuccess()); */
      signOut(dispatch);
      setSigningIn(false);
      toast.error("Sign in error!", {
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
  return (
    <Layout>
      <Head>
        <title>{title}</title>{" "}
      </Head>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to products
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
                    minLength: 6,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="message message--error">
                    Password must have atleast 6 characters
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                disabled={signingIn}
              >
                {signingIn ? "Signing in" : "Sign in"}
              </button>
              <div className="form__info">
                <p className="form__signup-link">
                  Not a member yet? <a href="/register">Sign up</a>
                </p>
                <p className="form__signup-link">
                  <a
                    href="/forgot-password"
                    className="form__info__forgot-password"
                  >
                    Forgot password?
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
