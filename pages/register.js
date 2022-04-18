import { useState } from "react";
import { useRouter } from "next/router";
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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signingUp, setSigningUp] = useState(false);
  const [result, setResult] = useState({ state: "success", message: "" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSigningUp(true);
    try {
      const res = await axios.post(`${server}/api/users/signup`, {
        fName: data.first_name,
        lName: data.last_name,
        email: data.email,
        contacts: [],
        phone: data.phone_number,
        password: data.password,
      });
      setResult({
        state: "success",
        message: "succefully signed up!",
      });
      const responseData = res.data;
      const authData = {
        accesstoken: responseData.accesstoken,
        refreshtoken: responseData.refreshtoken,
        id: responseData.id,
        role: responseData.role,
        accountStatus: responseData.accountStatus,
      };
      dispatch(setProfile(responseData.profile));
      dispatch(signinSuccess(authData));
      setSigningUp(false);
      toast.success("Registered succefully!", {
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
      console.log("error", error);
      setResult({
        state: "error",
        message: error.message
          ? error.message
          : "something went wrong while signing up!",
      });
      signOut(dispatch);
      /* dispatch(signoutSuccess()); */
      setSigningUp(false);
      toast.error("Registeration error!", {
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
  console.log("result", result);

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

          <div className="form-block" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            {/* <p className="form-block__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p> */}

            <form className="form">
              <div className="form__input-row">
                <input
                  disabled={signingUp}
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  {...register("first_name", {
                    required: true,
                    maxLength: 30,
                  })}
                />
                {errors.first_name && errors.first_name.type === "required" && (
                  <p className="message message--error">
                    First name is required
                  </p>
                )}
                {errors.first_name &&
                  errors.first_name.type === "maxLength" && (
                    <p className="message message--error">
                      First name is too long!
                    </p>
                  )}
              </div>

              <div className="form__input-row">
                <input
                  disabled={signingUp}
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  {...register("last_name", {
                    required: true,
                    maxLength: 30,
                  })}
                />
                {errors.last_name && errors.last_name.type === "required" && (
                  <p className="message message--error">
                    Last Name is required
                  </p>
                )}
                {errors.last_name && errors.last_name.type === "maxLength" && (
                  <p className="message message--error">
                    Last Name is too long!
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <input
                  disabled={signingUp}
                  className="form__input"
                  placeholder="Email"
                  type="text"
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    maxLength: 50,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">Email is required</p>
                )}
                {errors.email && errors.email.type === "maxLength" && (
                  <p className="message message--error">Email is too long!</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <input
                  disabled={signingUp}
                  className="form__input"
                  placeholder="Phone Number"
                  type="number"
                  name="phone_number"
                  {...register("phone_number", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.phone_number &&
                  errors.phone_number.type === "required" && (
                    <p className="message message--error">
                      Phone number is required
                    </p>
                  )}
                {errors.phone_number &&
                  errors.phone_number.type === "maxLength" && (
                    <p className="message message--error">
                      Phone number is too long!
                    </p>
                  )}
              </div>

              <div className="form__input-row">
                <input
                  disabled={signingUp}
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
                  <p className="message message--error">Password is required</p>
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
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                    />
                    <span className="checkbox__check"></span>
                    <p>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                disabled={signingUp}
              >
                {signingUp ? "Signing up" : "Sign up"}
              </button>

              <p className="form__signup-link">
                <Link href="/login">
                  <a href="#">Are you already a member?</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
