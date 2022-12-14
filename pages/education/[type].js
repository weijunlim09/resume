import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import styles from "../../styles/EducationType.module.scss";
import { queryWithoutParams } from "../../utils/api/queryWithoutParams";
import { queryWithParams } from "../../utils/api/queryWithParams";

const EduType = ({ data }) => {
  const router = useRouter();

  const LOGO_WIDTH = "100";
  const LOGO_HEIGHT = "100";

  console.log(data);

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
                      src={`https://img.icons8.com/fluency/512/000000/calendar-${Number(
                        edu["dateStart"].split("/")[0]
                      ).toString()}.png`}
                      alt="Start Date"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h3>Start Date</h3>
                    <span>{edu["dateStart"]}</span>
                  </div>
                  <div>
                    <Image
                      src={`https://img.icons8.com/fluency/512/000000/calendar-${Number(
                        edu["dateEnd"].split("/")[0]
                      ).toString()}.png`}
                      alt="End Date"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h3>End Date</h3>
                    <span>{edu["dateEnd"]}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/external-others-iconmarket/512/000000/external-building-types-of-building-others-iconmarket-66.png"
                      alt="Institute"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h3>Institute</h3>
                    <span>{edu["institute"]}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/external-justicon-lineal-color-justicon/512/000000/external-result-business-management-justicon-lineal-color-justicon.png"
                      alt="Result"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h3>Result</h3>
                    <span>{edu["result"].join(" , ")}</span>
                  </div>
                  <div>
                    <Image
                      src="https://img.icons8.com/clouds/512/000000/information.png"
                      alt="Extra"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h3>{edu["extra"]["description"]}</h3>
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
                      alt="Status"
                      width={LOGO_WIDTH}
                      height={LOGO_HEIGHT}
                    ></Image>
                    <h3>Status</h3>
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
    revalidate: parseInt(process.env.REVALIDATE_VALUE),
  };
}
