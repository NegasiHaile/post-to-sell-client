import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "./../../store/actions/userActions";

const ProductItem = ({
  discount,
  productImage,
  tag,
  id,
  name,
  price,
  currentPrice,
}) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state) => state.user);

  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      })
    );
  };

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart"></i>
        </button>

        <Link href={`/product/${id}`}>
          <a>
            <img src={productImage} alt="product" />
            {tag && tag !== "" && (
              <span className="product__discount">{tag}</span>
            )}
          </a>
        </Link>
      </div>

      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={
            "product__price " + (price ? "product__price--discount" : "")
          }
        >
          <h4>${currentPrice}</h4>

          {price && (
            <span style={{ textDecoration: "line-through" }}>${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
