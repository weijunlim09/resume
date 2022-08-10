import Image from "next/image";
import profilePic from "../public/Header/lwj.png";
import styles from "../styles/Header.module.scss";

const Header = () => {
  const IMAGE_HEIGHT = "25";
  const IMAGE_WIDTH = "25";
  const icon8UrlPrefix = "http://img.icons8.com/";

  const whatappsIcon = `${icon8UrlPrefix}/ios-glyphs/30/000000/whatsapp.png`;
  const emailIcon = `${icon8UrlPrefix}/ios-filled/50/000000/mail.png`;
  return (
    <>
      <div className={styles["header-main"]}>
        <div className={styles["contact"]}>
          <div className={styles["image-details"]}>
            <Image
              src={profilePic}
              alt="Profile Picture"
              objectFit="fill"
            ></Image>
          </div>
          <div className={styles["contact-details"]}>
            <Image
              src={whatappsIcon}
              alt="Phone"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
            ></Image>
            <Image
              src={emailIcon}
              alt="Email"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
            ></Image>
          </div>
        </div>
        <div className={styles["header-buttons"]}>Buttons</div>
      </div>
    </>
  );
};

export default Header;
