import { useState } from "react";
import Link from "next/link";

const AdvertLoading = ({
  discount,
  advertBanner,
  name,
  price,
  currentPrice,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFav = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <a
      href="https://www.horizontechict.com/"
      target="_blank"
      className="advert-item advert-item--loading"
    >
      <div className="advert__image">
        {advertBanner && (
          <span>
            <img src={advertBanner} alt="advert" />
            {discount && <span className="advert__discount">{discount}%</span>}
          </span>
        )}
      </div>
    </a>
  );
};

export default AdvertLoading;
