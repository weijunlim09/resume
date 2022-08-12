import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import BoxContainer from "../components/BoxContainer";
import profilePic from "../public/Header/lwj.png";
import styles from "../styles/Home.module.scss";

// default page
export default function Home({ contactData }) {
  const IMAGE_HEIGHT = "30";
  const IMAGE_WIDTH = "30";
  console.log(contactData);

  return (
    <div className={styles["home-main"]}>
      <div className={styles["left-home"]}>
        <BoxContainer title="Contact"></BoxContainer>
        <BoxContainer title="Contact"></BoxContainer>
        <BoxContainer title="Contact"></BoxContainer>
        <BoxContainer title="Contact"></BoxContainer>
      </div>
      <div className={styles["right-home"]}>
        <BoxContainer title="Contact"></BoxContainer>
        <BoxContainer title="Contact"></BoxContainer>
        <BoxContainer title="Contact"></BoxContainer>
      </div>

      {/* <BoxContainer title="Contact">
        <div>test</div>
      </BoxContainer> */}
      {/* <div className={styles["profile"]}>
        <Image
          src={profilePic}
          alt="Profile Picture"
          width="300"
          height="300"
        ></Image>
        <span>Lim Wei Jun</span>
        <span>Computer Science Fresh Graduate</span>
      </div>
      <div className={styles["contact"]}>
        {contactData &&
          contactData.map((data, index) => {
            return (
              <div key={index} className={styles["contact-individual"]}>
                {data["show"] && (
                  <Image
                    src={`${data["urlPrefix"]}${data["urlEndpoint"]}`}
                    alt={data["type"]}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                  ></Image>
                )}
                {data["show"] &&
                  (data["isAnchor"] ? (
                    <a
                      href={data["data"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data["data"]}
                    </a>
                  ) : (
                    <span>{data["data"]}</span>
                  ))}
              </div>
            );
          })}
      </div> */}
    </div>
  );
}

export async function getStaticProps() {
  // we cannot use React hooks in getstaticprops
  // we cannot use getStaticProps in Components - only applicable with pages

  let contactResponse = await axios.get(`${process.env.API_URL}contact`);
  let contactData = await contactResponse.data;
  if (!contactData) {
    return {
      notFound: true, //  return to 404 page, could not see in devs, only production

      // redirect: {
      //   destination: '/',
      //   permanent: false,
      //   statusCode: 301
      // },
    };
  }
  return {
    props: {
      contactData,
    },
    revalidate: 10,
  };
}
