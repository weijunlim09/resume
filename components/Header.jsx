import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

import styles from "../styles/Header.module.scss";
import Button from "./Button.jsx";

import { useRouter } from "next/router";

const Header = () => {
  const customButtonClicked = () => {};
  const router = useRouter();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(router.asPath);
  }, [router]);

  const headerContent = {
    Framework: "Next.js",
    "Use Case": "Build & Learn",
    CSS: "SCSS/SASS",
    Database: "MongoDB",
    Publisher: "▲ Vercel",
    Icon: "Icons8",
  };

  return (
    <>
      <div className={styles["header-main"]} id="header-id">
        <div className={styles["logo"]}></div>

        <div className={styles["header-content"]}>
          {Object.entries(headerContent).map((data, index) => {
            return (
              <span key={index}>
                {data[0]} : {data[1]}
              </span>
            );
          })}
        </div>
        {/* might add something ^ in the future */}
        <div className={styles["buttons"]}>
          {/* <div className={styles["left-buttons"]}>
            <ul></ul>
          </div> */}
          <div className={styles["right-buttons"]}>
            <ul>
              <li>
                <Link href="/" passHref>
                  <Button
                    isLink="true"
                    isHome="true"
                    imgSrc="https://img.icons8.com/material-outlined/24/000000/home--v2.png"
                  ></Button>
                </Link>
              </li>
              <li>
                <Link href="/experience" passHref>
                  <Button
                    isLink="true"
                    imgSrc="https://img.icons8.com/ios-glyphs/30/000000/briefcase.png"
                  ></Button>
                </Link>
              </li>

              <li>
                <Link href="/education" passHref>
                  <Button
                    isLink="true"
                    imgSrc="https://img.icons8.com/ios-glyphs/30/000000/school-building.png"
                  ></Button>
                </Link>
              </li>
              {/* <li>
                <Button
                  onClick={customButtonClicked}
                  customTitle="Refresh"
                  imgSrc="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                ></Button>
              </li> */}
            </ul>
          </div>
        </div>
        <div className={styles["current-location"]}>
          You are here &nbsp; : &nbsp;
          <Link href={path == "/" ? "/#" : "/"}>
            <a>Home</a>
          </Link>
          <span>
            {path == "/" || path == "/#" ? "" : path.split("/").join(" / ")}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
