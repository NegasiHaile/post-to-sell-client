import { useState } from "react";
import Link from "next/link";

const ProductItemLoading = ({ discount, productImage, name, currentPrice }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFav = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <a href="#" className="product-item product-item--loading">
      <div className="product__image">
        {productImage && (
          <Link href={`#`}>
            <a>
              <img src={productImage} alt="product" />
              {discount && (
                <span className="product__discount">{discount}%</span>
              )}
            </a>
          </Link>
        )}
      </div>

      <div className="product__description">
        {name && name !== "" ? <h4>{name}</h4> : <h3></h3>}
        {currentPrice && currentPrice !== "" ? (
          <div
            className={
              "product__price " + (discount ? "product__price--discount" : "")
            }
          >
            {currentPrice ? <h6>{currentPrice} ETB</h6> : <h4></h4>}

            {/* {discount && <span>${price}</span>} */}
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
