import { useRouter } from "next/router";
import CircleBox from "../../components/CircleBox";
import useSortDescDate from "../../hooks/useSortDescDate";
import styles from "../../styles/SelectCircleBox.module.scss";
import { getApi } from "../../utils/getApi";

const Education = ({ data }) => {
  const router = useRouter();
  const { sorted: sortedAllData } = useSortDescDate(data, "dateStart");
  if (data.length == 0 || !data) {
    return (
      <>
        <h1>There is a problem</h1>
      </>
    );
  }

  const arr = [];

  const uniqueType = sortedAllData.filter((data) => {
    if (!arr.includes(data["type"])) {
      arr.push(data["type"]);
      return data;
    }
  });

  const addedNewKeyEduData = uniqueType.map((data) => {
    return {
      url: `${data["urlPrefix"]}${data["urlEndpoint"]}`,
      title: data["type"].charAt(0).toUpperCase() + data["type"].slice(1),
      type: data["type"],
      logoSize: {
        width: "400",
        height: "400",
      },
    };
  });

  // Index.js

  return (
    <>
      <div className={styles["circle-box-main"]}>
        <h1>Education</h1>
        <h2>What I have studied</h2>
        <div className={styles["circle-box-content"]}>
          {addedNewKeyEduData?.map((data, index) => {
            return (
              <div
                onClick={() => {
                  router.push(`/education/${data["type"]}`);
                }}
                style={{ cursor: "pointer" }}
                key={index}
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

export default Education;

export async function getStaticProps(context) {
  const result = await getApi("education");

  return {
    props: {
      data: result,
    },
    revalidate: process.env.REVALIDATE_VALUE,
  };
}

// [...params] catch all routes
// [[...params]] - index.js + catch all routes
