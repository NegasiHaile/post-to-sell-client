/* import React, { Fragment } from "react";
import Router from "next/router";
// global styles
import "swiper/css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { wrapper } from "../redux/store";

import * as gtag from "./../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps, store }) => (
  <Fragment>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </Fragment>
);
export default wrapper.withRedux(MyAppwithReduxSaga({ async: true })); */
//export default withRedux(createStore)(withReduxSaga({ async: true }, MyApp));

/* class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Fragment>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Fragment>
    );
  }
}
export default wrapper.withRedux(withReduxSaga({ async: true })(MyApp)); */
/* 
import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import createStore from "../redux/store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
 */

import React, { Fragment } from "react";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { wrapper } from "../store";
// global styles
import "swiper/css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";
import 'react-toastify/dist/ReactToastify.css';

import * as gtag from "./../utils/gtag";
import ProductPage from "./products";

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
    </Fragment>
  );
};

export default wrapper.withRedux(MyApp);
