import Image from "next/image";
import styles from "../styles/EducationCardContainer.module.scss";
const EducationCardContainer = ({ data: eduData, props }) => {
  const { image, schoolName } = eduData;

  const keysToShow = [
    "academic",
    "dateStart",
    "dateEnd",
    "institute",
    "result",
    "status",
    "type",
  ];

  const IMAGE_WIDTH = 900;
  const IMAGE_HEIGHT = 400;
  eduData = Object.entries(eduData).filter((data) => {
    return keysToShow.includes(data[0]);
  });
  console.log(eduData);

  return (
    <>
      <div className={styles["education-card-container-main"]}>
        <div className={styles["education-card-container-image"]}>
          <Image
            src={image}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            alt={schoolName}
            objectFit="fill"
            objectPosition="bottomcenter"
          ></Image>
        </div>
        <div className={styles["education-card-container-data"]}>
          {eduData?.map((data, index) => {
            return (
              <div
                className={styles["education-card-container-row"]}
                key={index}
              >
                <div className={styles["education-card-container-title"]}>
                  <span>
                    {`${
                      data[0].length > 0
                        ? data[0].charAt(0).toUpperCase() +
                          data[0]
                            .slice(1)
                            .split(/(?=[A-Z])/)
                            // get next capital
                            .join(" ")
                        : data[0].charAt(0).toUpperCase() + data[0].slice(1)
                    }`}{" "}
                  </span>
                </div>
                <div className={styles["education-card-container-value"]}>
                  <span>
                    {Array.isArray(data[1])
                      ? data[1].length > 1
                        ? data[1].join(" , ")
                        : data[1]
                      : data[1].toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div {...props}></div> */}
      </div>
    </>
  );
};

export default EducationCardContainer;
