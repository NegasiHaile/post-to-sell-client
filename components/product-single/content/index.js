import { useState } from "react";
import productsColors from "./../../../utils/data/products-colors";
import productsSizes from "./../../../utils/data/products-sizes";
import CheckboxColor from "./../../products-filter/form-builder/checkbox-color";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { addProduct } from "./../../../store/actions/cartActions";
import { toggleFavProduct } from "./../../../store/actions/userActions";
import { displayMoney } from "./../../../utils/helpers";

const Content = ({ product }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");
  const [itemSize, setItemSize] = useState("");

  const onColorSet = (e) => setColor(e);
  const onSelectChange = (e) => setItemSize(e.target.value);

  const { favProducts } = useSelector((state) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      })
    );
  };

  const addToCart = () => {
    dispatch(
      addProduct({
        id: product.id,
        name: product.name,
        thumb: product.images[0],
        price: product.currentPrice,
        count: count,
        color: color,
        size: itemSize,
      })
    );
  };

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product._id}
        </h5>
        <span className="product-on-sale">
          {product.tag ? product.tag : "Sale"}
        </span>
        <h2 className="product__name">{product.productName}</h2>

        <div className="product__prices">
          <h4>{displayMoney(product.currentPrice || 4000)}</h4>
          {!product.discount && (
            <span>{displayMoney(product.price || 5000)}</span>
          )}
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-items-wrapper">
          <div className="product-filter-item">
            <h5>Color:</h5>
            <div className="checkbox-color-wrapper">
              {productsColors.map((type) => (
                <CheckboxColor
                  key={type.id}
                  type={"radio"}
                  name="product-color"
                  color={type.color}
                  valueName={type.label}
                  onChange={onColorSet}
                />
              ))}
            </div>
          </div>
          <div className="product-filter-item">
            <h5>
              Size: <strong>See size table</strong>
            </h5>
            <div className="checkbox-color-wrapper">
              <div className="select-wrapper">
                <select onChange={onSelectChange}>
                  <option>Choose size</option>
                  {productsSizes.map((type) => (
                    <option value={type.label}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Contacts:</h5>
          <div className="quantity-buttons" style={{ marginBottom: "18px" }}>
            <a
              className="btn btn--rounded btn--yellow"
              href={`tel:${
                (product.contacts && product.contacts.phone) || "+251983339025"
              }`}
              target="_blank"
            > 
              <i
                className="icon-send"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              {`Call ${
                (product.contacts && product.contacts.phone) || "+251983339025"
              }`}
            </a>
            <a
              className="btn btn--rounded btn--yellow"
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
              className="btn btn--rounded btn--yellow"
              href={`sms:${
                (product.contacts && product.contacts.phone) || "+251983339025"
              }`}
              target="_blank"
            >
              <i
                className="icon-send"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              SMS message
            </a>
            <a
              className="btn btn--rounded btn--yellow"
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
          <div className="quantity-buttons" style={{ marginBottom: "18px" }}>
            <a
              className="btn btn--rounded btn--yellow"
              href={`mailto:${
                (product.contacts && product.contacts.email) ||
                "yismawmintesnot@gmail.com"
              }?subject=testing&body=test body`}
              target="_blank"
            >
              <i
                className="icon-send"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              Send email
            </a>
            <a
              className="btn btn--rounded btn--yellow"
              href={`whatsapp://send?phone=${
                (product.contacts && product.contacts.phone) || "+251983339025"
              }&text=test message`}
              target="_blank"
            >
              <i
                className="icon-facebook"
                style={{ color: "#fff", marginRight: "10px" }}
              ></i>
              Whatsapp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
