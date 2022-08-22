import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSortDescDate from "../../hooks/useSortDescDate";
import styles from "../../styles/Experience.module.scss";
import { AppContext } from "../_app";

const Experience = ({ data }) => {
  const workTypeHasVariety =
    [...new Set(data.map((i) => i["type"]))].length > 1;

  console.log(data);
  // const unwrappedWorkData = data.map((singleData) => {
  //   return singleData["data"];
  // });

  // console.log(unwrappedWorkData);

  // const { sorted: sortedExperiences } = useSortDescDate(
  //   unwrappedWorkData,
  //   "startDate"
  // );

  // console.log(sortedExperiences);

  return (
    <>
      <div className={styles["experience-main"]}>
        <h1>Work Experiences</h1>
        <h2>What I have done</h2>
        <div></div>
      </div>
    </>
  );
};

export default Experience;

export async function getStaticProps(context) {
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

  const result = await getAxios("experience");

  return {
    props: {
      data: result,
    },
    revalidate: 10,
  };
}
