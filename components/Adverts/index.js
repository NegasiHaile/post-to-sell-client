import { useState, useEffect } from "react";
import AdvertItem from "./AdvertItem";
import { api_getAllAdverts } from "../../api/index";
function Adverts() {
  const [allAdverts, setAllAdverts] = useState([]);
  useEffect(async () => {
    const res = await api_getAllAdverts();
    setAllAdverts(res.data);
  }, []);
  return allAdverts.map((advert, index) => (
    <AdvertItem key={index} advert={advert} />
  ));
}

export default Adverts;
