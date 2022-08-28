import Image from "next/future/image";
import Head from "next/head";
import React, { createContext, useState } from "react";
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
  const iconCdn = "https://img.icons8.com/nolan/512/resume.png";

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}></Component>);
  }

  const testing = { name: "hi" };

  // useContext, API is not used due to we are using getStaticProps function
  return (
    <React.StrictMode>
      <Provider store={store}>
        <header>
          <Image
            src={Mountain}
            className={globalStyle["background"]}
            alt="Mountain"
            blurDataURL={Mountain["blurDataURL"]}
            id="background"
            loading="eager"
          ></Image>
          <Image
            src={Trees}
            className={globalStyle["background"]}
            alt="Mountain"
            blurDataURL={Trees["blurDataURL"]}
            id="foreground"
            loading="eager"
          ></Image>
          <h1>Welcome</h1>
        </header>

        <div className={globalStyle["global-main"]}>
          <AppContext.Provider value={{ testing }}>
            {/* <Image
              src={bgImage["src"]}
              alt={bgImage.toString()}
              layout="fill"
              objectFit="cover"
              objectPosition="topleft"
              blurDataURL={bgImage["blurDataURL"]}
            ></Image> */}
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
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
