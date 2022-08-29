import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import styles from "../../styles/EducationType.module.scss";
import { queryWithoutParams } from "../../utils/api/queryWithoutParams";
import { queryWithParams } from "../../utils/api/queryWithParams";

const EduType = ({ data }) => {
  const router = useRouter();
  console.log(data);

  const LOGO_WIDTH = "100";
  const LOGO_HEIGHT = "100";

  return (
    <>
      <div className={styles["education-type-main"]}>
        <h1>Education Level : {router.query["type"].toLocaleUpperCase()}</h1>
        <hr></hr>
        <div className={styles["education-type-content"]}>
          {data?.map((edu, index) => {
            return (
              <div className={styles["education-type-container"]} key={index}>
                <div className={styles["education-type-title"]}>
                  <span>{edu["academic"]}</span>
                </div>
                <div className={styles["education-type-details"]}>
                  <Image
                    src={edu["image"]}
                    width="1000"
                    alt={edu["institute"]}
                    height="500"
                    objectFit="fill"
                  ></Image>
                  <div>
                    <Image
                      src="https://img.icons8.com/fluency/512/000000/calendar-20.png"
                      alt="test"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h7>Start Date</h7>
                    <span>{edu["dateStart"]}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/fluency/512/000000/calendar-20.png"
                      alt="test"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h7>End Date</h7>
                    <span>{edu["dateEnd"]}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/external-others-iconmarket/512/000000/external-building-types-of-building-others-iconmarket-66.png"
                      alt="test"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h7>Institute</h7>
                    <span>{edu["institute"]}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/external-justicon-lineal-color-justicon/512/000000/external-result-business-management-justicon-lineal-color-justicon.png"
                      alt="test"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h7>Result</h7>
                    <span>{edu["result"].join(" , ")}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/clouds/512/000000/information.png"
                      alt="test"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h7>{edu["extra"]["description"]}</h7>
                    {/* <div className={styles["extra"]}> */}
                    {edu["extra"]["data"].map((info, index) => {
                      return (
                        <span key={index} className={styles["extra-span"]}>
                          {info}
                        </span>
                      );
                    })}
                    {/* </div> */}
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/000000/external-status-agile-flaticons-lineal-color-flat-icons-2.png"
                      alt="test"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h7>Status</h7>
                    <span>{edu["status"].toLocaleUpperCase()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EduType;

export async function getStaticPaths() {
  const data = await queryWithoutParams("Education");

  const allEduPaths = [...new Set(data.map((i) => i["type"]))].map((i) => {
    return {
      params: {
        type: i,
      },
    };
  });
  return {
    paths: allEduPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { type } = context.params;

  const data = await queryWithParams("Education", {
    type: type,
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: Number(process.env.REVALIDATE_VALUE),
  };
}
