import React from "react";

function LoadingSkeleton() {
  return (
    <div className="skeleton-category-item">
      <div className="card">
        <div className="skeleton-category-img"> </div>
        <div className="skeleton-category-content">
          <h3 className="skeleton-category-header"></h3>
          <p className="skeleton-category-text"></p>
          <p className="skeleton-category-text"></p>
          <p className="skeleton-category-text"></p>
          <ul>
            {/* {[...Array(subLength).keys()].map((value) => (
              <li>{subCategories[value]}</li>
            ))} */}
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <br></br>
          <button className="skeleton-category-btn">
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
