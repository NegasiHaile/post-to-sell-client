import { useState, useEffect } from "react";
import ProductsCarousel from "./carousel";
import { useRouter } from "next/router";
import useSwr from "swr";

import { api_getAllFeaturedProducts } from "../../api/index";

const ProductsFeatured = () => {
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [fproducts, setFproducts] = useState([]);

  useEffect(async () => {
    const res = await api_getAllFeaturedProducts();
    setFproducts(res.data);
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

        <ProductsCarousel products={fproducts} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
