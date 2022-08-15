import styles from "../styles/BoxContainer.module.scss";

const BoxContainer = (props) => {
  const { title: headerTitle } = props;
  return (
    <>
      <div className={styles["box-container-main"]}>
        <div className={styles["box-container-title"]}>
          <span>{headerTitle}</span>
        </div>
        <div {...props}></div>
      </div>
    </>
  );
};

export default BoxContainer;
