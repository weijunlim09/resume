import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import globalStyle from "../styles/global.module.scss";
import "../styles/styles.css";
import variables from "../styles/variables.module.scss";

function MyApp({ Component, pageProps }) {
  const iconCdn = "https://img.icons8.com/nolan/64/resume.png";

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}></Component>);
  }
  console.log(Component);

  return (
    <div className={globalStyle["global-main"]}>
      <Head>
        <title>Resume Project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Resume Project" key="title" />
        <link rel="icon" href={iconCdn}></link>
      </Head>
      <Header></Header>
      <Component {...pageProps} styling={globalStyle["global-body"]} />
      <Footer></Footer>
    </div>
  );
}

export default MyApp;
