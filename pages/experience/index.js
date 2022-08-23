import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CircleBox from "../../components/CircleBox";
import useSortDescDate from "../../hooks/useSortDescDate";
import styles from "../../styles/Experience.module.scss";
import { getAxios } from "../../utils/getAxios";
import { AppContext } from "../_app";

const Experience = ({ data }) => {
  const router = useRouter();

  const { sorted: sortedAllData } = useSortDescDate(data, "startDate");
  //#region Add New Title Key
  const addedNewKeyWorkData = sortedAllData.map((data) => {
    return {
      url: `${data["urlPrefix"]}${data["urlEndpoint"]}`,
      title: (data["desc"] = `${data["title"]} for ${data["company"]}`),
      id: data["id"],
      logoSize: {
        width: "400",
        height: "400",
      },
    };
  });
  //#endregion

  return (
    <>
      <div className={styles["experience-main"]}>
        <h1>Work Experiences</h1>
        <h2>What I have done</h2>
        <div className={styles["experiences-content"]}>
          {addedNewKeyWorkData?.map((data) => {
            return (
              <div
                onClick={() => {
                  router.push(`/experience/${data["id"]}`);
                }}
                style={{ cursor: "pointer" }}
                key={data["id"]}
              >
                <CircleBox
                  url={data["url"]}
                  title={data["title"]}
                  logoSize={data["logoSize"]}
                ></CircleBox>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Experience;

export async function getStaticProps(context) {
  const result = await getAxios("experience");

  return {
    props: {
      data: result,
    },
    revalidate: 10,
  };
}
