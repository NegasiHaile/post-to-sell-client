import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "./../../store/actions/userActions";

const ProductItem = ({
  product,
  discount,
  productImage,
  tag,
  id,
  name,
  price,
  currentPrice,
  myProduct,
  onClickEdit,
  onClickDelete,
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
        {/* <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart btn btn--rounded btn--call`}
        >
          {myProduct ? "Delete" : <i className="icon-heart"></i>}
        </button> */}

        <Link href={`/product/${id}`}>
          <a>
            <img src={productImage} alt="product" />
            {tag && tag !== "" && <a className="product__discount">{tag}</a>}
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
        {myProduct && (
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => onClickEdit(product)}
              className="product__discount"
            >
              {"Edit"}
            </button>
            <button
              onClick={() => onClickDelete(product)}
              className="product__discount"
            >
              {"Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
