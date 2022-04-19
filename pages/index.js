import Layout from "../layouts/Main";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Footer from "../components/footer";
import Subscribe from "../components/subscribe";
import Adverts from "../components/Adverts/index";
import Category from "../components/Category/Index";
const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />

      <div className="container featuredProducts_adverts">
        <div className="featured_products_container">
          <ProductsFeatured />
        </div>
        <div className="adverts_container">
          <Adverts />
        </div>
      </div>
      <section className="container">
        <h2 className="categories__title">Categories</h2>
        <div className="categories-list">
          <Category image="./images/featured-1.jpg" name="Men" />
          <Category image="./images/slide-1.jpg" name="Women" />
          <Category image="./images/featured-2.jpg" name="House hold" />
          <Category image="./images/slide-2.jpg" name="Devices" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Why should you Sell and Purchase here?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>
                  All purchases over $199 are eligible for free shipping via
                  USPS First Class Mail.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4>Easy Payments</h4>
                <p>
                  All payments are processed instantly over a secure payment
                  protocol.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Money-Back Guarantee</h4>
                <p>
                  If an item arrived damaged or you've changed your mind, you
                  can send it back for a full refund.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4>Finest Quality</h4>
                <p>
                  Designed to last, each of our products has been crafted with
                  the finest materials.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
