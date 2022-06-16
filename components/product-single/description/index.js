const Description = ({ show, product, category }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        {/* <i className="icon-cart"></i> */}
        <h4>
          {category} , {product.subCategory} , {product.brand}, {product.model}
        </h4>
        <p>{product.discription}</p>
      </div>
    </section>
  );
};

export default Description;
