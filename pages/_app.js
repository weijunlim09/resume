import Head from "next/head";
import { createContext, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import globalStyle from "../styles/global.module.scss";
import "../styles/styles.css";
import variables from "../styles/variables.module.scss";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const iconCdn = "https://img.icons8.com/nolan/64/resume.png";
  const [api, setApi] = useState("http://localhost:3004/");
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}></Component>);
  }
  // useContext, API is not used due to we are using getStaticProps function
  return (
    <AppContext.Provider value={{ api }}>
      <div className={globalStyle["global-main"]}>
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
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
