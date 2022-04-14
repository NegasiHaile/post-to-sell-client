import { useState } from "react";
import Link from "next/link";

const AdvertLoading = ({ advertBanner }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFav = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <div className="advert-item">
      <a href="https://www.horizontechict.com/" target="_blank">
        <div className="advert__image">
          {advertBanner && <img src={advertBanner} alt="advert" />}
        </div>
      </a>
    </div>
  );
};

export default AdvertLoading;
