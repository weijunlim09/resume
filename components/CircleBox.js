import Image from "next/image";
import styles from "../styles/CircleBox.module.scss";

const CircleBox = ({ url, title, logoSize }) => {
  return (
    <>
      <div className={styles["circle-box-main"]}>
        <Image
          src={url}
          width={logoSize["width"]}
          height={logoSize["height"]}
          alt={title}
          objectFit="fill"
        ></Image>
        <div className={styles["circle-box-label"]}>
          <span>{title}</span>
        </div>
      </div>
    </>
  );
};

export default CircleBox;
