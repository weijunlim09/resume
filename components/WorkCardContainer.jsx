import styles from "../styles/WorkCardContainer.module.scss";

const WorkCardContainer = (props) => {
  const { title: headerTitle } = props;
  return (
    <>
      <div className={styles["work-card-container-main"]}>
        <div className={styles["work-card-container-title"]}>
          <span>{headerTitle}</span>
        </div>
        <div {...props}></div>
      </div>
    </>
  );
};

export default WorkCardContainer;
