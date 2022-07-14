import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { displayMoney } from "./../../../utils/helpers";

const Content = ({ product, category }) => {
  const { favProducts } = useSelector((state) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id
  );
  const { categories } = useSelector((state) => {
    return {
      products: state.product.products,
      categories: state.product.categories,
    };
  });

  // useEffect(async () => {
  //   const res = await api_getAllCategories();
  //   console.warn(res.data);
  // }, []);

  const formateDate = (stringDate) => {
    const theDate = new Date(stringDate);
    const formated = theDate
      .toLocaleString()
      .substring(0, theDate.toLocaleString().indexOf(" "));
    return formated;
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
          <h2 className="product__name">
            {product.model} {"-"}
            {product.brand} {"-"}
            {product.subCategory} {"-"}
            {category}
          </h2>
        </div>
      </div>

      <div className="product-content__filters" style={{ marginTop: "30px" }}>
        <div className="product-filter-item">
          <h5>Contacts:</h5>
          <div className="quantity-buttons" style={{ marginBottom: "18px" }}>
            <a
              className="btn btn--rounded btn--call"
              href={`tel:${
                (product.contacts && product.contacts.phone) || "0983339025"
              }`}
              target="_blank"
            >
              <i
                className="icon-avatar"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              {` ${
                (product.contacts && product.contacts.phone) || "0983339025"
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
                (product.contacts && product.contacts.phone) || "+251983339025"
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
                (product.contacts && product.contacts.facebookUsername) ||
                "+251983339025"
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
    </section>
  );
};

export default Content;
