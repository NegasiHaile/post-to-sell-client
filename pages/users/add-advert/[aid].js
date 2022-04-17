import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/Main";
import AdvertLoading from "../../../components/Adverts/peview/add-advert";
import Toast from "../../../components/Utils/Toast";
import { BsSaveFill } from "react-icons/bs";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { server } from "../../../utils/server";

import {
  api_addAdvert,
  api_getAllUserAdverts,
  api_editAdvert,
  api_editAdvertBanner,
} from "../../../api/index";

// initial values of project state
const initialState = {
  title: "",
  link: "",
  description: "",
  duration: "",
  advertBanner: "",
};

function Add_Advert() {
  const { user } = useSelector((state) => {
    return { user: state.auth.user };
  });

  const router = useRouter();
  const [advert, setAdvert] = useState(initialState);
  const [AdvertBannerPreview, setAdvertBannerPreview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bannerEditing, setBannerEditing] = useState(false); // to check if the banner is editing

  const { aid } = router.query; // Get the product id from the url if found

  useEffect(async () => {
    if (user && aid != 0) {
      const res = await api_getAllUserAdverts(user);
      const add = res.data.filter((item) => item._id == aid);
      if (add.length > 0) {
        setEditing(true);
        setAdvert(add[0]);
        setAdvertBannerPreview(`${server}/${add[0].advertBanner}`);
      } else {
        setAdvertBannerPreview(null);
        setAdvert(initialState);
        setEditing(false);
      }
    } else {
      setAdvertBannerPreview(null);
      setAdvert(initialState);
      setEditing(false);
    }
  }, [aid, user]);

  useEffect(() => {
    // handling the advert banner preview if new imported image is detected
    if (advert.advertBanner?.size) {
      // advert.advertBanner.size is used to detect impoerted image
      const objectUrl = URL.createObjectURL(advert.advertBanner);
      setAdvertBannerPreview(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [advert.advertBanner]);

  // handle another fileds change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvert({ ...advert, [name]: value });
  };

  // handle the advert image input change
  const handleFileChange = (e) => {
    setAdvert({ ...advert, advertBanner: e.target.files[0] });
  };

  // Register the advert on submiting the form
  const onSubmitFormRegisterAdvert = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", advert.title);
      formData.append("link", advert.link);
      formData.append("description", advert.description);
      formData.append("duration", advert.duration);
      formData.append("type", "regular");
      formData.append("advertBanner", advert.advertBanner);

      const res = await api_addAdvert(formData, user);

      setAdvert(initialState);
      setAdvertBannerPreview(null);

      Toast("success", res.data.msg);
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  // Edit the advert detail on submiting the form (Without advert banner)
  const onSubmitFormEditAdvert = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const res = await api_editAdvert(advert, user, aid);
        Toast("success", res.data.msg);
      }
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };
  // Handel Banner File Change
  const onBannerFileChange = (e) => {
    setAdvert({ ...advert, advertBanner: e.target.files[0] });
    setBannerEditing(true);
  };

  // Editing advert banner
  const saveAdvertBannerChange = async (e) => {
    try {
      const formData = new FormData();
      formData.append("advertBanner", advert.advertBanner);

      const res = await api_editAdvertBanner(formData, user, aid);
      setBannerEditing(false);
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
            <h3 className="cart__title">Advertise you business</h3>
          </div>

          <div className="checkout-content">
            <div className="checkout__col-7">
              <div className="block">
                <h3 className="block__title">Advet detail</h3>
                <form
                  className="form"
                  onSubmit={
                    editing
                      ? onSubmitFormEditAdvert
                      : onSubmitFormRegisterAdvert
                  }
                >
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        placeholder="Business title"
                        type="text"
                        name="title"
                        value={advert.title}
                        required={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form__input-row">
                    <div className="form__col">
                      <textarea
                        rows={4}
                        className="form__input-textarea form__input--sm"
                        placeholder="Enter your business description here..."
                        type="text"
                        name="description"
                        value={advert.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <label> Business link</label>
                      <input
                        className="form__input form__input--sm"
                        placeholder="https://www.horizontechict.com/"
                        type="text"
                        name="link"
                        value={advert.link}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form__col">
                      <label> Advert duration</label>
                      <input
                        className="form__input form__input--sm"
                        placeholder="Duration"
                        type="date"
                        format="YYYY-MM-DD"
                        name="duration"
                        value={advert.duration}
                        required={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {!editing && (
                    <div className="form__input-row">
                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          style={{ paddingTop: "13px" }}
                          type="file"
                          accept="image/*"
                          name="advertBanner"
                          required={true}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}
                  <div className="cart-actions cart-actions--checkout">
                    <a href="/cart" className="cart__btn-back">
                      <i className="icon-left"></i> Back
                    </a>
                    <div className="cart-actions__items-wrapper">
                      <button
                        type="submit"
                        className="btn btn--rounded btn--yellow"
                      >
                        {editing ? "Update Detail" : "Submit Form"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block" style={{ position: "relative" }}>
                <h3 className="block__title">Advert banner preview</h3>

                <AdvertLoading
                  link={advert.link}
                  advertBanner={AdvertBannerPreview}
                  onBannerFileChange={onBannerFileChange}
                  editing={editing}
                />
                {bannerEditing && (
                  <button
                    onClick={() => saveAdvertBannerChange()}
                    type="button"
                    style={{
                      position: "absolute",
                      left: "10px",
                      bottom: "10px",
                    }}
                    name="saveAdvertBanner"
                    id={`saveAdvertBanner`}
                  >
                    <label
                      htmlFor={`saveAdvertBanner`}
                      style={{
                        color: "#fff",
                        cursor: "pointer",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "5px 10px",
                        borderRadius: "5%",
                        fontSize: "11px",
                      }}
                    >
                      <BsSaveFill /> &nbsp; Save
                    </label>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Add_Advert;
