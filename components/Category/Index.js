import React from "react";
import { useRouter } from "next/router";

function Category({ image, name, description, subCategories, id }) {
  const router = useRouter();

  const subLength = subCategories.length > 4 ? 4 : subCategories.length;

  const onClickViewDetail = () => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="category-item">
      <div className="card">
        <img className="category-img" src={image} alt="Rome" />
        <div className="category-content">
          <h3 className="category-header">{name}</h3>
          <p className="category-text">
            {description}
            {/* Rome is known for its stunning <strong> architecture</strong>, with
            the Colleseum, Pantheon. */}
          </p>
          <ul>
            {[...Array(subLength).keys()].map((value) => (
              <li>{subCategories[value].sub_name}</li>
            ))}
            {/*  <li>Sumsing Devices</li>
            <li>HP Devices</li>
            <li>CISCO Devices</li>
            <li>Techno Devices</li> */}
          </ul>
          <br></br>
          <button className="category-btn" onClick={onClickViewDetail}>
            Show all <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
