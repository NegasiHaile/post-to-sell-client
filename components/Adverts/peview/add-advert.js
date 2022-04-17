import { useState } from "react";
import Link from "next/link";
import { BsPencilFill } from "react-icons/bs";

const AdvertLoading = ({ link, advertBanner, onBannerFileChange, editing }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFav = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <div className="advert-item">
      <a href={link ? link : "https://www.horizontechict.com/"} target="_blank">
        {advertBanner && (
          <div className="advert__image" style={{ position: "relative" }}>
            <img src={advertBanner} alt="advert" />
            {editing && (
              <button
                type="button"
                className={`btn-add`}
                style={{ position: "absolute", right: "10px", top: "10px" }}
              >
                <input
                  onChange={(e) => onBannerFileChange(e)}
                  className="form__input form__input--sm"
                  style={{ paddingTop: "13px", display: "none" }}
                  type="file"
                  accept="image/*"
                  name="advertBanner"
                  id={`advertBanner`}
                />
                <label
                  htmlFor={`advertBanner`}
                  style={{
                    color: "#fff",
                    cursor: "pointer",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    textAlign: "center",
                    padding: "7px 10px",
                    borderRadius: "50%",
                  }}
                >
                  <BsPencilFill />
                </label>
              </button>
            )}
          </div>
        )}
      </a>
    </div>
  );
};

export default AdvertLoading;
