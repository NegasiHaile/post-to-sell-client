import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";

import { api_getAllBanners } from "../../api/index";

import { server } from "../../utils/server";
SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {
  const [banners, setBanners] = useState([
    {
      banner: "../../image/banners/slide1.jpg",
      static: true,
      title: "Get a fashioons of summer collection!",
    },
  ]);
  console.log("banners", banners);
  useEffect(async () => {
    const res = await api_getAllBanners();
    setBanners(res.data);
  }, []);
  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="page-intro__slide"
              style={{
                backgroundImage: banner.static
                  ? banner.banner
                  : `url('${server}/${banner.banner}')`,
              }}
            >
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>{banner.title} </h2>
                  <a href="#" className="btn-shop">
                    <i className="icon-right"></i>Shop now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>No purchasing fee at any cost!</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>User to user market</h4>
                <p>Users sell and buy their products without thrid party.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
