import { useState, useEffect } from "react";
import ProductsCarousel from "./carousel";
import { useRouter } from "next/router";
import useSwr from "swr";

import { api_getAllFeaturedProducts } from "../../api/index";

const ProductsFeatured = () => {
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [fproducts1, setFproducts1] = useState([]);
  const [fproducts2, setFproducts2] = useState([]);
  // const { data } = useSwr("/api/products", fetcher);

  useEffect(async () => {
    const res = await api_getAllFeaturedProducts();

    if (res.data.length >= 8) {
      var f1,
        f2 = [];
      f2 = res.data;
      f1 = res.data.splice(0, res.data.length / 2);
      console.log(f1);
      console.log(f2);

      setFproducts1(f1);
      setFproducts2(f2);
    } else {
      setFproducts1(res.data);
    }
  }, []);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Featured Products</h3>
          <button
            className="btn btn--rounded btn--border"
            onClick={() => router.push("/products")}
          >
            Show All
          </button>
        </header>

        <ProductsCarousel products={fproducts1} />
        <div style={{ padding: "20px" }}></div>
        <ProductsCarousel products={fproducts2} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
