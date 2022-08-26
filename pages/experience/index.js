import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CircleBox from "../../components/CircleBox";
import useSortDescDate from "../../hooks/useSortDescDate";
import styles from "../../styles/SelectCircleBox.module.scss";
import { getApi } from "../../utils/getApi";
import { AppContext } from "../_app";

const Experience = ({ data }) => {
  const router = useRouter();
  const { sorted: sortedAllData } = useSortDescDate(data, "startDate");
  if (data.length == 0 || !data) {
    return (
      <>
        <h1>There is a problem</h1>
      </>
    );
  }
  console.log(sortedAllData);

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
      <div className={styles["circle-box-main"]}>
        <h1>Work Experiences</h1>
        <h2>What I have done</h2>
        <div className={styles["circle-box-content"]}>
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
  const result = await getApi("experience");

  return {
    props: {
      data: result,
    },
    revalidate: process.env.REVALIDATE_VALUE,
  };
}
