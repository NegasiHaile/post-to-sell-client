import ProductsComponent from "../../components/products";

export async function getServerSideProps({ query }) {
  const category = query.category;
  /* const res = await fetch(`${server}/api/product/${pid}`);
    const product = await res.json(); */

  return {
    props: {
      /* product, */
      category,
    },
  };
}

const Products = ({ category }) => {
  return <ProductsComponent initCategory={category} />;
};
export default Products;
