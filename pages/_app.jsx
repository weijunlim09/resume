import Head from "next/head";
import Image from "next/image";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Mountain from "../public/static/Mountain.png";
import Trees from "../public/static/Trees.png";
import store from "../redux/store";
import globalStyle from "../styles/global.module.scss";
import "../styles/styles.css";
import variables from "../styles/variables.module.scss";

import { getAxios } from "../utils/getAxios.js";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  function scrollGoTo() {
    document.querySelector("#__next").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    const nextApp = document.querySelector("#__next");
    function goTop() {
      const appHeight = nextApp.scrollTop;
      const goTopDOM = document.querySelector(".goTop");
      const appearThreshold = 300;

      if (appHeight > appearThreshold) {
        goTopDOM.classList.add("active");
        goTopDOM.classList.remove("not-active");
      } else {
        goTopDOM.classList.remove("active");
        goTopDOM.classList.add("not-active");
      }
    }
    document.querySelector("#__next").addEventListener("scroll", goTop);
  }, []);
  const iconCdn = "https://img.icons8.com/nolan/512/resume.png";
  const welcomeRef = useRef();
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}></Component>);
  }

  const testing = { name: "hi" };

  // useContext, API is not used due to we are using getStaticProps function
  return (
    <React.StrictMode>
      <Provider store={store}>
        {/* <header ref={welcomeRef}>
          <Image
            src={Mountain}
            className={globalStyle["background"]}
            alt="Mountain"
            id="background"
            loading="eager"
            placeholder="blur"
          ></Image>
          <Image
            src={Trees}
            className={globalStyle["background"]}
            alt="Mountain"
            id="foreground"
            loading="eager"
            placeholder="blur"
          ></Image>
          <div className="background-text">
            <h1>Welcome</h1>
            <a href="#cool-section">Go To Cool Section</a>
          </div>
        </header> */}

        <div id="top"></div>

        <div className={globalStyle["global-main"]} id="cool-section">
          <AppContext.Provider value={{ testing }}>
            <Head>
              <title>Resume Project</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <meta property="og:title" content="Resume Project" key="title" />
              <link rel="icon" href={iconCdn}></link>
            </Head>

            <Header></Header>
            <Component {...pageProps} />
            <Footer></Footer>
          </AppContext.Provider>
        </div>
        <div className="goTop" onClick={scrollGoTo}>
          <Image
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/000000/external-arrow-up-web-flaticons-lineal-color-flat-icons-3.png"
            width="20"
            height="20"
            alt="goTop"
          ></Image>
        </div>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
