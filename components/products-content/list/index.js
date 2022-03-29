import useSwr from "swr";
import ProductItem from "./../../product-item";
import ProductsLoading from "./loading";
import { server } from "../../../utils/server";

const ProductsContent = ({ products, productloading, loadProducts }) => {
  //const fetcher = (url) => fetch(url).then((res) => res.json());
  //const { data, error } = useSwr("/api/products", fetcher);

  //if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!products &&
        (productloading.state === "error" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "150px",
            }}
          >
            <h4 className="message message--error">{productloading.message}</h4>
            <br />
            <button
              onClick={loadProducts}
              className="btn btn--rounded btn--yellow btn-submit"
            >
              Try Again
            </button>
          </div>
        ) : (
          <ProductsLoading />
        ))}

      {products && (
        <section className="products-list">
          {products.map((item) => (
            <ProductItem
              discount={item.price}
              key={item._id}
              id={item._id}
              price={item.price}
              currentPrice={item.price}
              productImage={`${server}/${item.images[0]}`}
              name={item.productName}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
