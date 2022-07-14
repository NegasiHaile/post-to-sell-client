import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import Layout from "../../layouts/Main";
import Toast from "../../components/Utils/Toast";
// API
import { api_getUserProfile, api_editUserProfile } from "../../api";

const profileInitialState = {
  fName: "",
  lName: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  contacts: {
    telegram: "",
    facebook: "",
    whatsapp: "",
  },
};

function Profile() {
  const { userProfile } = useSelector((state) => {
    return {
      userProfile: state.profile.profile,
    };
  });

  const [userAuth, setUserAuth] = useState({});
  const [profile, setProfile] = useState(profileInitialState);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    setUserAuth(user);
    // Check if there is a user profile in redux
    // if not request from api
    if (userProfile) {
      prepareUserProfile(userProfile);
    } else {
      const res = await api_getUserProfile(user.accesstoken);
      prepareUserProfile(res.data.profile);
    }
  }, []);

  // Assign existing user profile to the profile state
  const prepareUserProfile = (user) => {
    setProfile({
      fName: user.fName,
      lName: user.lName,
      gender: user.gender ? user.gender : "",
      phone: user.phone,
      email: user.email,
      address: user.address ? user.address : "",
      contacts: {
        telegram: user.contacts.telegram ? user.contacts.telegram : "",
        facebook: user.contacts.facebook ? user.contacts.facebook : "",
        whatsapp: user.contacts.whatsapp ? user.contacts.whatsapp : "",
      },
    });
  };

  const onChangeSocialContact = (e) => {
    const name = e.target.name;
    const contacts = {
      ...profile.contacts,
      [name]: e.target.value,
    };
    setProfile({
      ...profile,
      contacts: contacts,
    });
  };

  const onSubmitEditUserProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api_editUserProfile(userAuth, profile);
      Toast("success", res.data.msg);
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Profile</h3>
          </div>

          <form className="checkout-content" onSubmit={onSubmitEditUserProfile}>
            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Account detail</h3>
                <div className="form">
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="First name"
                        name="fName"
                        value={profile.fName}
                        onChange={(e) =>
                          setProfile({ ...profile, fName: e.target.value })
                        }
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Last name"
                        name="lName"
                        value={profile.lName}
                        onChange={(e) =>
                          setProfile({ ...profile, lName: e.target.value })
                        }
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <label> Gender</label>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "5px",
                        }}
                      >
                        <label
                          htmlFor="male"
                          className={`checkbox checkbox--sm`}
                          style={{ marginRight: "25px" }}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            id="male"
                            checked={profile.gender == "male"}
                            onChange={(e) =>
                              setProfile({ ...profile, gender: e.target.value })
                            }
                          />
                          <span className="checkbox__check"></span>
                          <p>Male</p>
                        </label>

                        <label
                          htmlFor="female"
                          className={`checkbox checkbox--sm`}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            id="female"
                            checked={profile.gender == "female"}
                            onChange={(e) =>
                              setProfile({ ...profile, gender: e.target.value })
                            }
                          />
                          <span className="checkbox__check"></span>
                          <p>Female</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Contacts/Address</h3>
                <div className="form">
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="number"
                        placeholder="Phone Number"
                        name="phone"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Social contacts</h3>
                <div className="form">
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Telegram user name"
                        name="telegram"
                        value={profile.contacts.telegram}
                        onChange={onChangeSocialContact}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Facebook"
                        name="facebook"
                        value={profile.contacts.facebook}
                        onChange={onChangeSocialContact}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Whatsapp"
                        name="whatsapp"
                        value={profile.contacts.whatsapp}
                        onChange={onChangeSocialContact}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="block"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <div className="checkout__col-6">
                <button
                  type="submit"
                  className="btn btn--rounded btn--yellow btn-submit"
                  style={{ width: "100%" }}
                  // disabled={signingIn}
                >
                  Update profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Profile;
