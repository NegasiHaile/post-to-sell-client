import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Next
import Head from "next/head";

// dev components
import Layout from "../../layouts/Main";

// APIs
import { api_getAllCategories } from "../../api/index";

// schedule notification initial state
const initialState = {
  category: "",
  categorykey: "",
  subcategory: "",
  subcategoryKey: "",
  brand: "",
  brandKey: "",
  model: "",
};
function ScheduleNotification() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => {
    return {
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
    // console.warn(scheduleDataFlow);
    setScheduleDataFlow(initialState);
    alert("You have successfully set a notification.");
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
      category: event.target.value,
      categoryKey: Index,
    });
    setNotifyMeWith(event.target.value);
  };

  const onSubCategoryChange = (event) => {
    const Index = findSelectedIndex(event);
    setScheduleDataFlow({
      ...scheduleDataFlow,
      subcategory: event.target.value,
      subcategoryKey: Index,
    });
    setNotifyMeWith(event.target.value);
  };

  const onBrandChange = (event) => {
    const Index = findSelectedIndex(event);
    setScheduleDataFlow({
      ...scheduleDataFlow,
      brand: event.target.value,
      brandKey: Index,
    });
    setNotifyMeWith(event.target.value);
  };

  console.warn(categoriesData);
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
                      name="category"
                      value={scheduleDataFlow.category}
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
                  {scheduleDataFlow.categoryKey && (
                    <div className="select-wrapper select-form">
                      <select
                        className="form__input form__input--sm"
                        name="subCategory"
                        value={scheduleDataFlow.subCategory}
                        onChange={(e) => onSubCategoryChange(e)}
                      >
                        <option value="">Select sub-category</option>
                        {categoriesData.length > 0 &&
                          categoriesData[
                            scheduleDataFlow.categoryKey
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
                  {scheduleDataFlow.subcategoryKey && (
                    <div className="select-wrapper select-form">
                      <select
                        className="form__input form__input--sm"
                        name="brand"
                        value={scheduleDataFlow.brand}
                        onChange={(e) => onBrandChange(e)}
                      >
                        <option value="">Select brand</option>
                        {categoriesData.length > 0 &&
                          categoriesData[
                            scheduleDataFlow.categoryKey
                          ].subCategory[
                            scheduleDataFlow.subcategoryKey
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
