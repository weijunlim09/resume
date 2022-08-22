import Head from "next/head";
import Image from "next/image";
import React, { createContext, useState } from "react";
import { Provider } from "react-redux";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import bgImage from "../public/static/mountain2.jpg";
import store from "../redux/store";
import globalStyle from "../styles/global.module.scss";
import "../styles/styles.css";
import variables from "../styles/variables.module.scss";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const iconCdn = "https://img.icons8.com/nolan/64/resume.png";

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}></Component>);
  }

  async function getAxios(endpoints, params = {}) {
    const queryString = Object.entries(params)
      .map((param) => {
        return `${param[0]}=${param[1]}`;
      })
      .join("&");
    const response = await axios.get(
      `${process.env.API_URL}${endpoints}${
        Object.keys(params).length !== 0 ? `?${queryString}` : ""
      }`
    );
    const data = await response.data;

    return data;
  }

  const testing = { name: "hi" };

  // useContext, API is not used due to we are using getStaticProps function
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className={globalStyle["global-main"]}>
          <AppContext.Provider value={{ getAxios }}>
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
