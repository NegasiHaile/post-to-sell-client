import ProductItem from "./../../product-item";
import ProductsLoading from "../../products-content/list/loading";

import { server } from "../../../utils/server";

let slidesPerView = 1.5;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 2;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 3;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

const ProductsCarousel = ({ products }) => {
  if (!products) return <ProductsLoading />;

  return (
    <div className="products-content">
      <section className="products-list">
        {products.map(
          (item) =>
            item.status === "active" && (
              <ProductItem
                discount={item.discount}
                price={item.price}
                currentPrice={item.currentPrice}
                key={item._id}
                id={item._id}
                productImage={`${server}/${item.images[0]}`}
                name={item.productName}
              />
            )
        )}
      </section>
    </div>
  );
};

export default ProductsCarousel;
