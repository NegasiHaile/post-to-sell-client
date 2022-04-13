import React, { useState, useEffect } from "react";
("react");
import Layout from "../../layouts/Main";

import AdvertLoading from "../../components/Adverts/peview/add-advert";
import { api_addAdvert } from "../../api/index";
import { useSelector } from "react-redux";

const initialState = {
  title: "",
  link: "",
  description: "",
  duration: "",
  advertBanner: "",
};

function Add_Advert() {
  const auth = useSelector((state) => state.auth);
  const [advert, setAdvert] = useState(initialState);
  const [AdvertBannerPreview, setAdvertBannerPreview] = useState(null);

  useEffect(() => {
    // handling the advert banner preview
    if (advert.advertBanner) {
      const objectUrl = URL.createObjectURL(advert.advertBanner);
      setAdvertBannerPreview(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [advert.advertBanner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvert({ ...advert, [name]: value });
  };

  const handleFileChange = (e) => {
    // handle the advert image input
    setAdvert({ ...advert, advertBanner: e.target.files[0] });
  };
  const submitForm = async (e) => {
    // Save the advert content
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", advert.title);
      formData.append("link", advert.link);
      formData.append("description", advert.description);
      formData.append("duration", advert.duration);
      formData.append("advertBanner", advert.advertBanner);
      formData.append("type", "regular");
      const res = await api_addAdvert(formData, auth);

      setAdvert(initialState);
      console.log(res.data.msg);
    } catch (error) {}
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
                <form className="form" onSubmit={submitForm}>
                  <div className="form__input-row">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        placeholder="Business title"
                        type="text"
                        name="title"
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
                        name="discription"
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
                        required={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
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
                  <div className="cart-actions cart-actions--checkout">
                    <a href="/cart" className="cart__btn-back">
                      <i className="icon-left"></i> Back
                    </a>
                    <div className="cart-actions__items-wrapper">
                      <button
                        type="submit"
                        className="btn btn--rounded btn--yellow"
                      >
                        Submit Form
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Advert banner preview</h3>
                <AdvertLoading advertBanner={AdvertBannerPreview} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Add_Advert;
