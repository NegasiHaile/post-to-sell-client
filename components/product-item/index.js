import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "./../../store/actions/userActions";

const ProductItem = ({
  product,
  productImage,
  tag,
  id,
  name,
  currentPrice,
  myProduct,
  onClickEdit,
  onClickDelete,
  onClickSold,
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
        <Link href={`/product/${id}`}>
          <a>
            <img src={productImage} alt="product" />
            {tag && tag !== "" && <a className="product__discount">{tag}</a>}
          </a>
        </Link>
      </div>

      <div className="product__description" style={{ marginTop: "0px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "3px",
            justifyContent: "space-between",
            marginTop: "-15px",
          }}
        >
          <p style={{ textAlign: "start" }}>{name}</p>
          <p style={{ textAlign: "end", color: "red" }}>{currentPrice} ETB</p>
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
            <button
              onClick={() => onClickSold(product)}
              className="product__discount btn_call"
            >
              {"Sold"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
