const Breadcrumb = ({ currentPage }) => (
  <section className="breadcrumb">
    <div className="container">
      <ul className="breadcrumb-list">
        <li>
          <a href="#">
            <i className="icon-home"></i>
          </a>
        </li>
        <li>{currentPage ? currentPage : "All Products"}</li>
      </ul>
    </div>
  </section>
);

export default Breadcrumb;
