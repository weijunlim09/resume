import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useFetch from "../hooks/useFetch";
import profilePic from "../public/Header/lwj.png";
import styles from "../styles/Header.module.scss";
import Button from "./Button.jsx";

const Header = () => {
  const customButtonClicked = () => {
    console.log("refreshclicked");
  };
  return (
    <>
      <div className={styles["header-main"]}>
        <div className={styles["logo"]}></div>

        {/* <div style={{ display: "none" }}>Empty</div> */}
        {/* might add something ^ in the future */}
        <div className={styles["buttons"]}>
          <div className={styles["left-buttons"]}>
            <ul>
              <li>
                <Link href="/profile" passHref>
                  <Button
                    isLink="true"
                    imgSrc="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
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
              <li>
                <Link href="/skills" passHref>
                  <Button
                    isLink="true"
                    imgSrc="https://img.icons8.com/ios-glyphs/30/000000/development-skill.png"
                  ></Button>
                </Link>
              </li>
            </ul>
          </div>
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
                <Button
                  onClick={customButtonClicked}
                  customTitle="Refresh"
                  imgSrc="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                ></Button>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["current-location"]}>cur location</div>
      </div>
    </>
  );
};

export default Header;
