import styles from "../styles/EducationCardContainer.module.scss";

const EducationCardContainer = (props) => {
  const { title: headerTitle } = props;
  return (
    <>
      <div className={styles["education-card-container-main"]}>
        <div className={styles["education-card-container-title"]}>
          <span>{headerTitle}</span>
        </div>
        <div {...props}></div>
      </div>
    </>
  );
};

export default EducationCardContainer;
