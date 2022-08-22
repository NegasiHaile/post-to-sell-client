import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import { useSelector } from "react-redux";

// Import APIs
import { api_getProductDetail } from "../../api";

export async function getServerSideProps({ query }) {
  const pid = query.pid;

  return {
    props: {
      pid,
    },
  };
}

const Product = ({ pid }) => {
  const [showBlock, setShowBlock] = useState("description");
  const [product, setProduct] = useState(null);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (products) {
      const prdct = products.filter((value) => value._id === pid)[0];
      if (prdct) {
        setProduct(prdct);
      } else {
        getProductDetail();
      }
    } else {
      getProductDetail();
    }
  }, [pid]);

  const getProductDetail = async () => {
    const res = await api_getProductDetail(pid);
    setProduct(res.data);
  };

  return (
    <Layout>
      <Breadcrumb currentPage={`Products / ${product && product.name}`} />
      {product && (
        <section className="product-single">
          <div className="container">
            <div className="product-single__content">
              <Gallery images={product.images} />
              <Content product={product} />
            </div>

            <div className="product-single__info">
              <Description
                product={product}
                show={showBlock === "description"}
              />
              {/* <Reviews product={product} show={showBlock === 'reviews'} /> */}
            </div>
          </div>
        </section>
      )}
      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
