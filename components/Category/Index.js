import React from "react";

function Category({ image, name }) {
  return (
    <div className="category-item">
      <div className="card">
        <img className="category-img" src={image} alt="Rome" />
        <div className="category-content">
          <h3 className="category-header">{name}</h3>
          <p className="category-text">
            Rome is known for its stunning <strong> architecture</strong>, with
            the Colleseum, Pantheon.
          </p>
          <ul>
            <li>Sumsing Devices</li>
            <li>HP Devices</li>
            <li>CISCO Devices</li>
            <li>Techno Devices</li>
          </ul>
          <br></br>
          <button className="category-btn">
            Show all <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
