import { getPageFiles } from "next/dist/server/get-page-files.js";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import BoxContainer from "../components/BoxContainer.jsx";
import EducationCardContainer from "../components/EducationCardContainer.jsx";
import SkillCardContainer from "../components/SkillCardContainer.jsx";
import WorkCardContainer from "../components/WorkCardContainer.jsx";
import useSortDescDate from "../hooks/useSortDescDate.js";
import profilePic from "../public/static/Header/lwj.png";
import {
  useAddContactMutation,
  useContactsQuery,
  useContactTypeQuery,
} from "../redux/services/ContactApi";
import styles from "../styles/Home.module.scss";
import { getApi } from "../utils/getApi";
import { getAxios } from "../utils/getAxios.js";

// default page
export default function Home({ data }) {
  const router = useRouter();

  const {
    contactData,
    selfIntroData,
    profileData,
    promoterData,
    softwareDeveloperData,
    extraDetailsData,
    technicalSkillsData,
    softSkillsData,
    selfLearnSkillsData,
    secondaryEduData,
    tertiaryEduData,
  } = data;

  //#region Sorting Work Experience
  const experiences = [...promoterData, ...softwareDeveloperData];
  const { sorted: sortedExperiences } = useSortDescDate(
    experiences,
    "startDate"
  );

  sortedExperiences.forEach((exp) => {
    exp[
      "titleWithDate"
    ] = `${exp["title"]} (${exp["startDate"]} - ${exp["endDate"]})`;
  });

  //#endregion

  const IMAGE_HEIGHT = "30";
  const IMAGE_WIDTH = "30";
  const PROFILE_IMAGE_HEIGHT = "200";
  const PROFILE_IMAGE_WIDTH = "200";

  const technicalData = technicalSkillsData[0]["data"];
  const selfLearnTechnicalData = selfLearnSkillsData[0]["data"];

  //#region Sort Education
  const eduData = [...secondaryEduData, ...tertiaryEduData];
  const { sorted: sortedEduData } = useSortDescDate(eduData, "dateStart");

  //#endregion

  //#region RTK Query
  // const { data, error, isLoading, isFetching, isSuccess, refetch } =
  //   useContactsQuery();
  // const { data: whatappsData } = useContactTypeQuery();
  // const [addContact] = useAddContactMutation();

  //#endregion

  return (
    <div className={styles["home-main"]}>
      <div className={styles["left-home"]}>
        <BoxContainer title="Contact">
          <div className={styles["profile"]}>
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={PROFILE_IMAGE_WIDTH}
              height={PROFILE_IMAGE_HEIGHT}
              objectFit="contain"
            ></Image>
            <div className={styles["profile-details"]}>
              {selfIntroData?.["show"] && (
                <span>{selfIntroData?.["name"]}</span>
              )}
              {selfIntroData?.["show"] && (
                <span>{selfIntroData?.["description"]}</span>
              )}

              <div className={styles["contact-details"]}>
                {contactData &&
                  contactData.map((data, index) => {
                    return (
                      <div key={index} className={styles["contact-individual"]}>
                        {data["show"] && (
                          <Image
                            src={`${data["urlPrefix"]}${data["urlEndpoint"]}`}
                            alt={data["type"]}
                            width={IMAGE_WIDTH}
                            height={IMAGE_HEIGHT}
                            objectFit="contain"
                          ></Image>
                        )}
                        {data["show"] &&
                          (data["isAnchor"] ? (
                            <a
                              href={data["data"]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {data["type"]}
                            </a>
                          ) : (
                            <span>{data["data"]}</span>
                          ))}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </BoxContainer>

        <BoxContainer title="Profile">
          <div className={styles["short-profile"]}>
            {profileData?.[0]["show"] && (
              <div
                dangerouslySetInnerHTML={{ __html: profileData?.[0]["data"] }}
              ></div>
            )}
          </div>
        </BoxContainer>

        <BoxContainer title="Soft Skills">
          <div className={styles["ul-li-details"]}>
            <ul>
              {softSkillsData?.[0]["data"].map((skill, index) => {
                return <li key={index}>{skill["show"] && skill["data"]}</li>;
              })}
            </ul>
          </div>
        </BoxContainer>

        <BoxContainer title="Education">
          {sortedEduData?.map((ed, index) => {
            return (
              <EducationCardContainer
                key={index}
                data={ed}
              ></EducationCardContainer>
            );
          })}
        </BoxContainer>

        <BoxContainer title="Extra Details">
          <div className={styles["ul-li-details"]}>
            <ul>
              {extraDetailsData?.map((data, index) => {
                return <li key={index}>{data["show"] && data["data"]}</li>;
              })}
            </ul>
          </div>
        </BoxContainer>
      </div>
      <div className={styles["right-home"]}>
        <BoxContainer title="Work Experience">
          {sortedExperiences?.map((experience, index) => {
            return (
              <WorkCardContainer
                title={experience["titleWithDate"]}
                className={styles["sub-box-container"]}
                key={index}
              >
                <div className={styles["experience"]}>
                  <div className={styles["label"]}>Description</div>
                  <div className={styles["value"]}>
                    <span>{experience["description"][0]}</span>
                    {experience["description"].length > 1 ? (
                      <a
                        onClick={() => {
                          const landingPage = `/${experience["page"]}/${experience["id"]}`;
                          router.push(landingPage);
                        }}
                      >
                        See More
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={styles["experience"]}>
                  <div className={styles["label"]}>Company</div>
                  <div className={styles["value"]}>
                    <span>{experience["company"]}</span>
                  </div>
                </div>
                <div className={styles["experience"]}>
                  <div className={styles["label"]}>Location</div>
                  <div className={styles["value"]}>
                    <span>{experience["location"]}</span>
                  </div>
                </div>
                <div className={styles["experience"]}>
                  <div className={styles["label"]}>Products</div>
                  <div className={styles["value"]}>
                    {experience["products"].map((product, counter) => {
                      return <span key={counter}>{product}</span>;
                    })}
                  </div>
                </div>
                {experience["techLibaryFrameworkStacks"] && (
                  <div className={styles["experience"]}>
                    <div className={styles["label"]}>Techs</div>
                    <div className={styles["value"]}>
                      <div className={styles["techs"]}>
                        <ul>
                          {experience["techLibaryFrameworkStacks"].map(
                            (tech, count) => {
                              return (
                                <li key={count} data-name={tech["name"]}>
                                  <Image
                                    src={`${tech["urlPrefix"]}${tech["urlEndpoint"]}`}
                                    width="20"
                                    height="20"
                                    objectFit="fill"
                                    alt={tech["name"]}
                                  ></Image>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </WorkCardContainer>
            );
          })}
        </BoxContainer>
        <BoxContainer title="Technical Skills">
          <div className={styles["skills"]}>
            {technicalData?.map((data, index) => {
              return (
                <SkillCardContainer
                  key={index}
                  skillLogoURL={`${data["urlPrefix"]}${data["urlEndpoint"]}`}
                  skillName={data["data"]}
                  skillRate={data["familiarity"]}
                ></SkillCardContainer>
              );
            })}
          </div>
        </BoxContainer>
        <BoxContainer title="Self Learn Technical Skills" id="self-learn">
          <div className={styles["skills"]} id="self-learn">
            {selfLearnTechnicalData?.map((data, index) => {
              return (
                <SkillCardContainer
                  key={index}
                  skillLogoURL={`${data["urlPrefix"]}${data["urlEndpoint"]}`}
                  skillName={data["data"]}
                  skillRate={data["familiarity"]}
                ></SkillCardContainer>
              );
            })}
          </div>
        </BoxContainer>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // we cannot use React hooks in getstaticprops
  // we cannot use getStaticProps in Components - only applicable to pages

  const data = {
    contactData: await getApi("contact"),
    selfIntroData: await getApi("introduction"),
    profileData: await getApi("profile"),
    promoterData: await getApi("experience", {
      type: "Promoter",
    }),
    softwareDeveloperData: await getApi("experience", {
      type: "Software Developer",
    }),
    extraDetailsData: await getApi("extra"),
    technicalSkillsData: await getApi("skills", {
      type: "technical",
    }),
    softSkillsData: await getApi("skills", {
      type: "soft",
    }),
    selfLearnSkillsData: await getApi("skills", {
      type: "selfLearn",
    }),
    secondaryEduData: await getApi("education", {
      type: "secondary",
    }),
    tertiaryEduData: await getApi("education", {
      type: "tertiary",
    }),
  };

  const newData = await getApi("contact");

  console.log(newData);
  return {
    props: {
      data,
    },
    revalidate: Number(process.env.REVALIDATE_VALUE),
  };
}
