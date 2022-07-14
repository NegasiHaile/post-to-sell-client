import React, { Fragment } from "react";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Store
import { wrapper } from "../store";

// global styles
import "swiper/css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";
import "react-toastify/dist/ReactToastify.css";

// React components
import { ToastContainer } from "react-toastify";

// Utils
import * as gtag from "./../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }) => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  console.log("router.pathname", router.pathname);
  if (
    (router.pathname === "/login" || router.pathname === "/register") &&
    user
  ) {
    router.push("/products");
  }

  return (
    <Fragment>
      <Component {...pageProps} />
      <ToastContainer /* closeButton={false} */ position="bottom-right" />
    </Fragment>
  );
};

export default wrapper.withRedux(MyApp);
