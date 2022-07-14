import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import { useSelector } from "react-redux";

export async function getServerSideProps({ query }) {
  const pid = query.pid;

  return {
    props: {
      /* product, */
      pid,
    },
  };
}

const Product = ({ /* product,  */ pid }) => {
  const [showBlock, setShowBlock] = useState("description");
  const [product, setProduct] = useState(null);
  const products = useSelector((state) => state.product.products);

  const { categories } = useSelector((state) => {
    return {
      products: state.product.products,
      categories: state.product.categories,
    };
  });

  useEffect(() => {
    setProduct(
      products ? products.filter((value) => value._id === pid)[0] : null
    );
  }, [pid]);

  const filterCategoryName = (id) => {
    console.warn(id);
    const category = categories.filter((category) => category._id === id);
    if (category.length > 0) {
      return category[0].category;
    }
  };

  return (
    <Layout>
      <Breadcrumb currentPage={`Products / ${product && product.name}`} />
      {product && (
        <section className="product-single">
          <div className="container">
            <div className="product-single__content">
              <Gallery images={product.images} />
              <Content
                product={product}
                category={filterCategoryName(product.category)}
              />
            </div>

            <div className="product-single__info">
              <Description
                product={product}
                show={showBlock === "description"}
                category={filterCategoryName(product.category)}
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
