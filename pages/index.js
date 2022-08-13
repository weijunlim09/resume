import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import BoxContainer from "../components/BoxContainer";
import profilePic from "../public/Header/lwj.png";
import {
  useAddContactMutation,
  useContactsQuery,
  useContactTypeQuery,
} from "../redux/services/ContactApi";
import styles from "../styles/Home.module.scss";

// default page
export default function Home({ contactData }) {
  const IMAGE_HEIGHT = "30";
  const IMAGE_WIDTH = "30";

  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useContactsQuery();
  const { data: whatappsData } = useContactTypeQuery();
  const [addContact] = useAddContactMutation();

  console.log(data);

  return (
    <></>
    // <div className={styles["home-main"]}>
    //   <div className={styles["left-home"]}>
    //     <BoxContainer title="Contact">
    //       <div className={styles["profile"]}>
    //         <Image
    //           src={profilePic}
    //           alt="Profile Picture"
    //           width="200"
    //           height="200"
    //           objectFit="contain"
    //         ></Image>
    //         <div className={styles["profile-details"]}>
    //           <span>Lim Wei Jun</span>
    //           <span>Computer Science Fresh Graduate</span>
    //           <div className={styles["contact-details"]}>
    //             {contactData &&
    //               contactData.map((data, index) => {
    //                 return (
    //                   <div key={index} className={styles["contact-individual"]}>
    //                     {data["show"] && (
    //                       <Image
    //                         src={`${data["urlPrefix"]}${data["urlEndpoint"]}`}
    //                         alt={data["type"]}
    //                         width={IMAGE_WIDTH}
    //                         height={IMAGE_HEIGHT}
    //                         objectFit="contain"
    //                       ></Image>
    //                     )}
    //                     {data["show"] &&
    //                       (data["isAnchor"] ? (
    //                         <a
    //                           href={data["data"]}
    //                           target="_blank"
    //                           rel="noopener noreferrer"
    //                         >
    //                           {data["type"]}
    //                         </a>
    //                       ) : (
    //                         <span>{data["data"]}</span>
    //                       ))}
    //                   </div>
    //                 );
    //               })}
    //           </div>
    //         </div>
    //       </div>
    //     </BoxContainer>
    //   </div>
    //   <div className={styles["right-home"]}>
    //     <BoxContainer title="Contact"></BoxContainer>
    //   </div>
    // </div>
  );
}

// export async function getStaticProps() {
//   // we cannot use React hooks in getstaticprops
//   // we cannot use getStaticProps in Components - only applicable with pages

//   // let contactResponse = await axios.get(`${process.env.API_URL}contact`);
//   // let contactData = await contactResponse.data;
//   if (!contactData) {
//     return {
//       notFound: true, //  return to 404 page, could not see in devs, only production

//       // redirect: {
//       //   destination: '/',
//       //   permanent: false,
//       //   statusCode: 301
//       // },
//     };
//   }
//   return {
//     props: {
//       // contactData,
//     },
//     revalidate: 10,
//   };
// }
