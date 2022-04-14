import React from "react";

import { server } from "../../utils/server";
function AdvertItem({ advert }) {
  return (
    <div className="advert_item">
      <a href={advert.link} target="_blank">
        {" "}
        <img src={`${server}/${advert.advertBanner}`} alt={advert.title} />
      </a>
    </div>
  );
}

export default AdvertItem;
