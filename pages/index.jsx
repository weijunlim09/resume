import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BoxContainer from "../components/BoxContainer.jsx";
import EducationCardContainer from "../components/EducationCardContainer.jsx";
import SkillCardContainer from "../components/SkillCardContainer.jsx";
import WorkCardContainer from "../components/WorkCardContainer.jsx";
import useSortDescDate from "../hooks/useSortDescDate.js";
import profilePic from "../public/static/Header/lwj2.jpg";
import {
  useAddContactMutation,
  useContactsQuery,
  useContactTypeQuery,
} from "../redux/services/ContactApi";
import styles from "../styles/Home.module.scss";

import variables from "../styles/variables.module.scss";
import { queryWithoutParams } from "../utils/api/queryWithoutParams";
import { queryWithParams } from "../utils/api/queryWithParams";

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

  const leftHomeRef = useRef();
  const rightHomeRef = useRef();
  useEffect(() => {
    const allBoxes = [
      ...leftHomeRef["current"]["children"],
      ...rightHomeRef["current"]["children"],
    ];
    function scrollToAppear() {
      for (let i = 0; i < allBoxes.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = allBoxes[i].getBoundingClientRect().top;
        var revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          allBoxes[i].classList.add("active");
          allBoxes[i].classList.remove("not-active");
        } else {
          allBoxes[i].classList.remove("active");
          allBoxes[i].classList.add("not-active");
        }
      }
    }
    document
      .querySelector("#__next")
      .addEventListener("scroll", scrollToAppear);

    return () => {
      document.querySelector("#__next").removeEventListener("scroll", null);
    };
  }, []);

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
      <div ref={leftHomeRef} className={styles["left-home"]}>
        <BoxContainer title="Contact">
          <div className={styles["profile"]}>
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={PROFILE_IMAGE_WIDTH}
              height={PROFILE_IMAGE_HEIGHT}
              objectFit="contain"
            ></Image>
            <br></br>
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
            <br></br>
            <br></br>
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
      </div>
      <div ref={rightHomeRef} className={styles["right-home"]}>
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
    </div>
  );
}

export async function getStaticProps() {
  // we cannot use React hooks in getstaticprops
  // we cannot use getStaticProps in Components - only applicable to pages

  const data = {
    contactData: await queryWithoutParams("Contact"),
    selfIntroData: await queryWithoutParams("Introduction"),
    profileData: await queryWithoutParams("Profile"),
    extraDetailsData: await queryWithoutParams("Extra"),
    promoterData: await queryWithParams("Experience", {
      type: "Promoter",
    }),
    softwareDeveloperData: await queryWithParams("Experience", {
      type: "Software Developer",
    }),
    technicalSkillsData: await queryWithParams("Skills", {
      type: "technical",
    }),
    softSkillsData: await queryWithParams("Skills", {
      type: "soft",
    }),
    selfLearnSkillsData: await queryWithParams("Skills", {
      type: "selfLearn",
    }),
    secondaryEduData: await queryWithParams("Education", {
      type: "secondary",
    }),
    tertiaryEduData: await queryWithParams("Education", {
      type: "tertiary",
    }),
  };

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: parseInt(process.env.REVALIDATE_VALUE),
  };
}
