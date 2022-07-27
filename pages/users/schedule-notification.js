import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Next
import Head from "next/head";

// dev components
import Layout from "../../layouts/Main";
import Toast from "../../components/Utils/Toast";

// APIs
import {
  api_getAllCategories,
  api_scheduleNotification,
} from "../../api/index";

// schedule notification initial state
const initialState = {
  categoryId: "",
  categoryIndex: "",
  subcategoryId: "",
  subcategoryIndex: "",
  brandId: "",
  brandIndex: "",
  model: "",
};
function ScheduleNotification() {
  const dispatch = useDispatch();
  const { user, categories } = useSelector((state) => {
    return {
      user: state.auth.user,
      categories: state.product.categories,
    };
  });

  const [categoriesData, setCategoriesData] = useState({});
  const [scheduleDataFlow, setScheduleDataFlow] = useState(initialState);
  const [notifyMeWith, setNotifyMeWith] = useState("");

  // Get all list of categories
  const loadCategories = async () => {
    try {
      const res = await api_getAllCategories();
      setCategoriesData(res.data);
      dispatch(setCategories(res.data));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (categories) {
      setCategoriesData(categories);
    } else {
      loadCategories();
    }
  }, [categories]);

  useEffect(() => {}, [scheduleDataFlow]);

  const scheduleNotifiaction = async (e) => {
    e.preventDefault();
    const res = await api_scheduleNotification(user, {
      notificationTarget: notifyMeWith,
    });
    setScheduleDataFlow(initialState);
    Toast("success", res.data.msg);
  };

  // Find the key of selected option
  const findSelectedIndex = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    return event.target.options[selectedIndex].getAttribute("data-key");
  };

  const onCategoryChange = (event) => {
    const Index = findSelectedIndex(event);
    setScheduleDataFlow({
      ...initialState,
      categoryId: event.target.value,
      categoryIndex: Index,
    });
    setNotifyMeWith(event.target.value);
  };

  const onSubCategoryChange = (event) => {
    const Index = findSelectedIndex(event);
    setScheduleDataFlow({
      ...scheduleDataFlow,
      subcategoryId: event.target.value,
      subcategoryIndex: Index,
    });
    setNotifyMeWith(event.target.value);
  };

  const onBrandChange = (event) => {
    const Index = findSelectedIndex(event);
    setScheduleDataFlow({
      ...scheduleDataFlow,
      brandId: event.target.value,
      brandIndex: Index,
    });
    setNotifyMeWith(event.target.value);
  };

  const onModelChange = (event) => {
    setScheduleDataFlow({
      ...scheduleDataFlow,
      model: event.target.value,
    });
    setNotifyMeWith(event.target.value);
  };

  return (
    <Layout>
      <div className="cart">
        <Head>
          <title> schedule post notification</title>
        </Head>
        <section className="form-page">
          <div className="container">
            <div className="form-block">
              <h2 className="form-block__title">Schedule post notification</h2>
              <p>You will notify when a product of your choice posts.</p>

              <form className="form" onSubmit={scheduleNotifiaction}>
                <div className="form__col">
                  <div className="select-wrapper select-form">
                    <select
                      className="form__input form__input--sm"
                      name="categoryId"
                      value={scheduleDataFlow.categoryId}
                      onChange={(e) => onCategoryChange(e)}
                      required={true}
                    >
                      <option value="">Select category</option>
                      {categoriesData.length > 0 &&
                        categoriesData.map((category, index) => {
                          return (
                            <option
                              key={category._id}
                              data-key={index}
                              value={category._id}
                            >
                              {category.category}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <br />
                  {scheduleDataFlow.categoryIndex && (
                    <div className="select-wrapper select-form">
                      <select
                        className="form__input form__input--sm"
                        name="subCategoryId"
                        value={scheduleDataFlow.subCategoryId}
                        onChange={(e) => onSubCategoryChange(e)}
                      >
                        <option value="">Select sub-category</option>
                        {categoriesData.length > 0 &&
                          categoriesData[
                            scheduleDataFlow.categoryIndex
                          ].subCategory.map((sub, index) => {
                            return (
                              <option
                                key={sub.id}
                                data-key={index}
                                value={sub.id}
                              >
                                {sub.sub_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  )}
                  <br />
                  {scheduleDataFlow.subcategoryIndex && (
                    <div className="select-wrapper select-form">
                      <select
                        className="form__input form__input--sm"
                        name="brandId"
                        value={scheduleDataFlow.brandId}
                        onChange={(e) => onBrandChange(e)}
                      >
                        <option value="">Select brand</option>
                        {categoriesData.length > 0 &&
                          categoriesData[
                            scheduleDataFlow.categoryIndex
                          ].subCategory[
                            scheduleDataFlow.subcategoryIndex
                          ].brands.map((brand, index) => {
                            return (
                              <option
                                key={brand.id}
                                data-key={index}
                                value={brand.id}
                              >
                                {brand.brand_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  )}
                  <br />
                  {scheduleDataFlow.brandIndex && (
                    <div className="select-wrapper select-form">
                      <select
                        className="form__input form__input--sm"
                        name="model"
                        value={scheduleDataFlow.model}
                        onChange={(e) => onModelChange(e)}
                      >
                        <option value="">Select model</option>
                        {categoriesData.length > 0 &&
                          categoriesData[
                            scheduleDataFlow.categoryIndex
                          ].subCategory[
                            scheduleDataFlow.subcategoryIndex
                          ].brands[scheduleDataFlow.brandIndex].models.map(
                            (model, index) => {
                              return (
                                <option
                                  key={index}
                                  data-key={index}
                                  value={model}
                                >
                                  {model}
                                </option>
                              );
                            }
                          )}
                      </select>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn--rounded btn--yellow btn-submit"
                >
                  Notify me
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ScheduleNotification;
