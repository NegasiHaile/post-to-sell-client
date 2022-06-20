import { useState } from "react";
import Link from "next/link";

const ProductItemLoading = ({
  discount,
  productImage,
  name,
  price,
  currentPrice,
  previousImages,
  productImageDelete,
  onUploadImage,
  addingProduct,
  onSelectImageFile,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFav = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <a href="#" className="product-item product-item--loading">
      <div className="product__image">
        {previousImages[0].file && (
          <button
            disabled={productImageDelete.isLoading}
            type="button"
            onClick={() => onUploadImage(previousImages[0], 0)}
            className={`btn-upload btn--rounded-upload btn--yellow-upload`}
          >
            save
          </button>
        )}
        <button type="button" className={`btn-add`}>
          <input
            disabled={addingProduct}
            className="form__input form__input--sm"
            style={{ paddingTop: "13px", display: "none" }}
            type="file"
            accept="image/*"
            name="productImage"
            onChange={(e) => onSelectImageFile(e, 0)}
            id={`image-input${6}`}
          />
          <label for={`image-input${6}`}>+</label>
        </button>
        {productImage && (
          <Link href={`#`}>
            <a>
              <img src={productImage} alt="product" />
            </a>
          </Link>
        )}
      </div>

      <div className="product__description">
        {name && name !== "" ? <h2>{name}</h2> : <h3></h3>}
        {currentPrice && currentPrice !== "" ? (
          <div
            className={
              "product__price " + (discount ? "product__price--discount" : "")
            }
          >
            <h2>${currentPrice}</h2>

            {discount && <span>${price}</span>}
          </div>
        ) : (
          <div className={"product__price"}>
            <h4></h4>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProductItemLoading;
