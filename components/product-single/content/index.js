import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// components
import PaymentModal from "../../PaymentModal/PaymentModal";

// Utils
import {
  filterCategoryName,
  filterSubCategoryName,
  filterBrandName,
} from "../../../utils/ProductCategory/Category";
import { displayMoney } from "./../../../utils/helpers";
import { numberOfDaysInInterval } from "../../../utils/date/numberOfDays";
import Toast from "../../Utils/Toast";

// APIs
import { api_updateProductPaymentStatus } from "../../../api";

const Content = ({ product }) => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const { categories, profile } = useSelector((state) => {
    return {
      categories: state.product.categories,
      profile: state.profile.profile,
    };
  });

  // use states
  const [showModal, setShowModal] = useState(false);
  const [payFor, setPayFor] = useState(1);

  const formateDate = (stringDate) => {
    const theDate = new Date(stringDate);
    const formated = theDate
      .toLocaleString()
      .substring(0, theDate.toLocaleString().indexOf(" "));
    return formated;
  };

  const updateProductPaymentStatus = async () => {
    try {
      const res = await api_updateProductPaymentStatus(
        product._id,
        Number(payFor),
        auth.user.accesstoken
      );
      setShowModal(false);
      Toast("success", res.data.msg);
      router.push("/users/my-products");
    } catch (error) {
      Toast("error", error.response.data.msg);
    }
  };

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">{formateDate(product.createdAt)}</h5>
        {product.status && (
          <span className="product-on-sale">{product.status}</span>
        )}
        <h2 className="product__name">{product.productName}</h2>

        <div className="product__prices">
          <h4>{displayMoney(product.currentPrice || 4000)}</h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        ></div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          {categories && (
            <h2 className="product__name">
              {product.model}
              {"-"}
              {filterBrandName(
                categories,
                product.category,
                product.subCategory,
                product.brand
              )}
              {"-"}
              {filterSubCategoryName(
                categories,
                product.category,
                product.subCategory
              )}
              {"-"}
              {filterCategoryName(categories, product.category)}
            </h2>
          )}
        </div>
      </div>

      <div className="product-content__filters" style={{ marginTop: "30px" }}>
        <div className="product-filter-item">
          <h5>Contacts:</h5>
          <div className="quantity-buttons" style={{ marginBottom: "18px" }}>
            <a
              className="btn btn--rounded btn--call"
              href={`tel:${
                (product.contacts && product.contacts.phoneNumber) ||
                "Not added"
              }`}
              target="_blank"
            >
              <i
                className="icon-avatar"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              {` ${
                (product.contacts && product.contacts.phoneNumber) ||
                "Not added"
              }`}
            </a>
            <a
              className="btn btn--rounded btn--telegram"
              href={`https://t.me/${
                (product.contacts && product.contacts.telegramUsername) ||
                "minoty"
              }`}
              target="_blank"
            >
              <i
                className="icon-send"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              Telegram
            </a>
          </div>
          <div className="quantity-buttons" style={{ marginBottom: "18px" }}>
            <a
              className="btn btn--rounded btn--whatsapp"
              href={`whatsapp://send?phone=${
                (product.contacts && product.contacts.whatsapp) || ""
              }&text=test message`}
              target="_blank"
            >
              <i
                className="icon-twitter"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              Whatsapp
            </a>
            <a
              className="btn btn--rounded btn--facebook"
              href={`fb://profile/${
                (product.contacts && product.contacts.facebook) || ""
              }`}
              target="_blank"
            >
              <i
                className="icon-facebook"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              Facebook
            </a>
          </div>
        </div>
      </div>
      {(product.postPayment == 0 ||
        numberOfDaysInInterval(new Date(), new Date(product.postExpireDate)) <=
          5) &&
      product.userId == profile?._id ? (
        <div className="cart-actions__items-wrapper">
          <button
            type="button"
            className="btn btn--rounded btn--border btn--yellow"
            onClick={() => setShowModal(true)}
          >
            Pay post fee
          </button>
        </div>
      ) : (
        ""
      )}
      {showModal && (
        <PaymentModal
          category={product.category}
          payFor={payFor}
          setPayFor={setPayFor}
          showModal={showModal}
          setShowModal={setShowModal}
          updateProductPaymentStatus={updateProductPaymentStatus}
          product={product}
        />
      )}
    </section>
  );
};

export default Content;
