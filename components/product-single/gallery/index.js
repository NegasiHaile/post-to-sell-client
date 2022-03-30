import { useState } from "react";
import { server } from "../../../utils/server";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "../../../store/actions/userActions";

const Gallery = ({ images }) => {
  const [featImage, setFeatImage] = useState(images[0]);
  const onChangeFeatImage = (image) => {
    setFeatImage(image);
  };

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <div
            onClick={() => onChangeFeatImage(image)}
            key={image}
            className="product-gallery__thumb"
          >
            <img src={`${server}/${image}`} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        {/* <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart"></i>
        </button> */}
        <img src={`${server}/${featImage}`} alt="" />
      </div>
    </section>
  );
};

export default Gallery;
