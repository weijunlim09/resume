import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CircleBox from "../../components/CircleBox";
import useSortDescDate from "../../hooks/useSortDescDate";
import styles from "../../styles/Experience.module.scss";
import { AppContext } from "../_app";

const Experience = ({ data }) => {
  // console.log(data);
  const router = useRouter();

  const addIconToData = data.map((jobType) => {
    jobType["data"].map((job) => {
      return (job["url"] = `${jobType["urlPrefix"]}${jobType["urlEndpoint"]}`);
    });
    return jobType;
  });

  const getAllId = [
    ...new Set(addIconToData.map((job) => job["data"].map((j) => j["id"]))),
  ].flat(Number.POSITIVE_INFINITY);

  const allData = addIconToData
    .map((job) => job["data"])
    .flat(Number.POSITIVE_INFINITY);
  const { sorted: sortedAllData } = useSortDescDate(allData, "startDate");

  //#region Add New Title Key
  const addedNewKeyWorkData = sortedAllData.map((data) => {
    return {
      url: data["url"],
      title: (data["desc"] = `${data["title"]} for ${data["company"]}`),
      id: data["id"],
      logoSize: {
        width: "400",
        height: "400",
      },
    };
  });
  console.log(addedNewKeyWorkData);
  //#endregion

  return (
    <>
      <div className={styles["experience-main"]}>
        <h1>Work Experiences</h1>
        <h2>What I have done</h2>
        <div className={styles["experiences-content"]}>
          {addedNewKeyWorkData?.map((data) => {
            return (
              <>
                <div
                  onClick={() => {
                    router.push(`/experience/${data["id"]}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <CircleBox
                    url={data["url"]}
                    title={data["title"]}
                    logoSize={data["logoSize"]}
                  ></CircleBox>
                </div>
              </>
            );
          })}
        </div>
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
