import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import BoxContainer from "../components/BoxContainer.jsx";
import SkillCardContainer from "../components/SkillCardContainer.jsx";
import WorkCardContainer from "../components/WorkCardContainer.jsx";
import SunwayUniPicture from '../public/Education/Sunway-University.jpg';
import profilePic from "../public/Header/lwj.png";
import {
  useAddContactMutation,
  useContactsQuery,
  useContactTypeQuery
} from "../redux/services/ContactApi";
import styles from "../styles/Home.module.scss";

import EducationCardContainer from "../components/EducationCardContainer.jsx";


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

  const promoterExperiences = promoterData[0]["data"];
  const softwareDeveloperExperiences = softwareDeveloperData[0]["data"];
  const experiences = [...promoterExperiences, ...softwareDeveloperExperiences];

  const sortedExperiences = experiences.sort((current, next) => {
    const nextDate = new Date(next["startDate"]);
    const currentDate = new Date(current["startDate"]);
    return nextDate - currentDate;
  });

  // combining title + dates
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

  const technicalData = technicalSkillsData[0]['data'];
  const selfLearnTechnicalData = selfLearnSkillsData[0]['data'];
  


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
                <span>{selfIntroData?.["data"]["name"]}</span>
              )}
              {selfIntroData?.["show"] && (
                <span>{selfIntroData?.["data"]["description"]}</span>
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
            {profileData?.["show"] && (
              <div 
                dangerouslySetInnerHTML={{ __html: profileData?.["data"] }}
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
          <EducationCardContainer title="Sunway University" image={SunwayUniPicture}>
          </EducationCardContainer>
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
                onClick={() => {
                  const landingPage = `/${experience['page']}/${experience['id']}`;
                  router.push(landingPage);
                }}
              >
                <div className={styles["experience"]}>
                  <div className={styles["label"]}>Description</div>
                  <div className={styles["value"]}>
                    {experience["description"].map((des, ind) => {
                      return (
                        <span key={ind}>{`${des
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}...`}</span>
                      );
                    })}
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
                )}
              </WorkCardContainer>
            );
          })}
        </BoxContainer>
        <BoxContainer title="Technical Skills">
          <div className={styles['skills']}>
            {
              technicalData?.map((data, index) => {
                return(
                  <SkillCardContainer key={index} skillLogoURL={`${data['urlPrefix']}${data['urlEndpoint']}`} skillName={data['data']} skillRate={data['familiarity']}>
                  </SkillCardContainer>
                )
              })
            }
          </div>
        </BoxContainer>
        <BoxContainer title="Self Learn Technical Skills">
            <div className={styles['skills']}>
              {
                selfLearnTechnicalData?.map((data, index) => {
                  return (
                    <SkillCardContainer key={index} skillLogoURL={`${data['urlPrefix']}${data['urlEndpoint']}`} skillName={data['data']} skillRate={data['familiarity']}>
                    </SkillCardContainer>
                  )
                })
              }
            </div>
        </BoxContainer>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // we cannot use React hooks in getstaticprops
  // we cannot use getStaticProps in Components - only applicable to pages

  // facade pattern
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

  const data = {
    contactData: await getAxios("contact"),
    selfIntroData: await getAxios("introduction"),
    profileData: await getAxios("profile"),
    promoterData: await getAxios("experience", {
      type: "promoter",
    }),
    softwareDeveloperData: await getAxios("experience", {
      type: "software developer",
    }),
    extraDetailsData: await getAxios("extraDetails"),
    technicalSkillsData: await getAxios("skills", {
      type: "technical",
    }),
    softSkillsData: await getAxios("skills", {
      type: "soft",
    }),
    selfLearnSkillsData: await getAxios("skills", {
      type: "selfLearn",
    }),
    secondaryEduData: await getAxios("education", {
      type: "secondary",
    }),
    tertiaryEduData: await getAxios("education", {
      type: "tertiary",
    }),
  };

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
