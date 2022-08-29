import { useRouter } from "next/router";
import { getApi } from "../../utils/getApi";

import Image from "next/image";
import SkillCardContainer from "../../components/SkillCardContainer";
import styles from "../../styles/ExperienceId.module.scss";

import { queryWithoutParams } from "../../utils/api/queryWithoutParams";
import { queryWithParams } from "../../utils/api/queryWithParams";

const ExperienceId = ({ data }) => {
  const router = useRouter();

  const LOGO_WIDTH = "100";
  const LOGO_HEIGHT = "100";

  if (data.length == 0 || !data) {
    return <h1>An Error has occur with id {id} </h1>;
  }

  const { asPath } = router;
  const exp = data[0];
  const startDate = exp["startDate"].split("/")[0];
  const endDate = exp["endDate"].split("/")[0];

  const dynamicStartDate = `https://img.icons8.com/fluency/512/000000/calendar-${Number(
    startDate
  ).toString()}.png`;
  const dynamicEndDate = `https://img.icons8.com/fluency/512/000000/calendar-${Number(
    endDate
  ).toString()}.png`;
  return (
    <>
      <div className={styles["experience-id-main"]}>
        <h1>{asPath || "Path not found"}</h1>
        <hr></hr>
        <div className={styles["experience-id-company"]}>
          <h2 className={styles["grid-col-span-3"]}>What Company is this?</h2>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src="https://img.icons8.com/fluency/512/000000/new-company.png"
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>Name</h3>
            <span>{exp["company"]}</span>
          </div>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/000000/external-description-copywriting-flaticons-lineal-color-flat-icons-2.png"
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>About</h3>
            <span>{exp["shortDesc"]}</span>
          </div>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src="https://img.icons8.com/color/512/000000/malaysia.png"
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>State</h3>
            <span>{exp["city"]}</span>
          </div>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src="https://img.icons8.com/dusk/512/000000/marker.png"
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>Location</h3>
            <span>{exp["location"]}</span>
          </div>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/000000/external-products-industry-flaticons-lineal-color-flat-icons.png"
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>Products</h3>
            <span>
              {exp["products"].length == 1
                ? exp["products"]
                : exp["products"].join(" , ")}
            </span>
          </div>
        </div>
        <hr></hr>
        <div className={styles["experience-id-duration"]}>
          <h2>When did I start ?</h2>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src={dynamicStartDate}
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>Start Date</h3>
            <span>{exp["startDate"]}</span>
          </div>
          <div>
            <div className={styles["logo-circle"]}>
              <Image
                src={dynamicEndDate}
                alt="Company"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                objectFit="fill"
              ></Image>
            </div>
            <h3>End Date</h3>
            <span>{exp["endDate"]}</span>
          </div>
        </div>
        <hr></hr>
        <div className={styles["experience-id-description"]}>
          <h2 className={styles["grid-col-span-3"]}>
            What I have learnt from this experience ?
          </h2>
          {exp?.["description"].map((des, index) => {
            return (
              <div
                key={index}
                className={
                  exp?.["description"].length % 2 == 0
                    ? styles["grid-col-span-4"]
                    : index < 2 || index == exp?.["description"].length - 1
                    ? styles["grid-col-span-4"]
                    : styles["grid-col-span-2"]
                }
              >
                {des}
              </div>
            );
          })}
        </div>
        <hr></hr>
        {exp["techLibaryFrameworkStacks"] && (
          <>
            <div className={styles["skills"]}>
              <h2>What Tech Stacks I have used?</h2>
              {exp["techLibaryFrameworkStacks"]?.map((data, index) => {
                return (
                  <SkillCardContainer
                    key={index}
                    skillLogoURL={`${data["urlPrefix"]}${data["urlEndpoint"]}`}
                    skillName={data["name"]}
                    skillRate={data["familiarity"]}
                  ></SkillCardContainer>
                );
              })}
            </div>
            <hr></hr>
          </>
        )}
      </div>
    </>
  );
};

export default ExperienceId;

// Note: You should not use fetch() to call
// an API route in >getStaticProps. Instead,
// directly import the logic used inside >your API route.
// You may need to slightly refactor your code for >this approach.
// Fetching from an external API is fine!

export async function getStaticPaths() {
  const data = await queryWithoutParams("Experience");
  const paths = data.map((i) => {
    return {
      params: {
        id: i["id"],
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const data = await queryWithParams("Experience", {
    id: id,
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
}
