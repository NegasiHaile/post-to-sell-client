import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Main";
import { api_getAllAdverts } from "../../api/index";
function MyAdverts() {
  const [myAdverts, setMyAdverts] = useState([]);

  useEffect(() => {
    const res = api_getAllAdverts();
    setMyAdverts(res.data);
    console.log(myAdverts);
  }, []);
  return (
    <Layout>
      <br />
      <div className="container">My Adverts</div>
    </Layout>
  );
}

export default MyAdverts;
