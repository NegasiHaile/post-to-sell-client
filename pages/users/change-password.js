import React, { useState, useEffect } from "react";
import Head from "next/head";
// API
import { api_ChangeMyPassword } from "../../api/index";

// Components
import Layout from "../../layouts/Main";
import Toast from "../../components/Utils/Toast";

const paswordInitialState = {
  oldPassword: "",
  newPassword: "",
  retypeNewPassword: "",
};

function ChangePassword() {
  const [userAuth, setUserAuth] = useState({});
  const [password, setPassword] = useState(paswordInitialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    setUserAuth(user);
  }, []);

  // Update password state on password input change
  const onChangeInput = (e) => {
    const name = e.target.name;
    setPassword({ ...password, [name]: e.target.value });
  };

  // Save the password change on submit form
  const onSubmitSaveChange = async (e) => {
    e.preventDefault();
    try {
      if (password.newPassword === password.retypeNewPassword) {
        if (password.oldPassword !== password.newPassword) {
          const res = await api_ChangeMyPassword(userAuth, password);
          setPassword(paswordInitialState);
          Toast("success", res.data.msg);
        } else {
          Toast("error", "New password must be different from the old one!");
        }
      } else {
        Toast("error", "New password not match!");
      }
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  return (
    <Layout>
      <div className="cart">
        <Head>
          <title>Change password</title>
        </Head>
        <section className="form-page">
          <div className="container">
            <div className="form-block">
              <h2 className="form-block__title">Change password</h2>

              <form className="form" onSubmit={onSubmitSaveChange}>
                <div className="form__input-row">
                  <input
                    className="form__input form__input--sm"
                    placeholder="Your old password"
                    type={showPassword ? "text" : "password"}
                    name="oldPassword"
                    value={password.oldPassword}
                    onChange={onChangeInput}
                    required={true}
                  />
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input form__input--sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create new password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={onChangeInput}
                    minLength={6}
                    required={true}
                  />
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input form__input--sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Retype new password"
                    name="retypeNewPassword"
                    value={password.retypeNewPassword}
                    onChange={onChangeInput}
                    minLength={6}
                    required={true}
                  />
                </div>
                <label
                  htmlFor="check-signed-in"
                  className={`checkbox checkbox--sm`}
                >
                  <input
                    type="checkbox"
                    name="keepSigned"
                    id="check-signed-in"
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <span className="checkbox__check"></span>
                  <p>Show password!</p>
                </label>

                <button
                  type="submit"
                  className="btn btn--rounded btn--yellow btn-submit"
                >
                  Save Change
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ChangePassword;
