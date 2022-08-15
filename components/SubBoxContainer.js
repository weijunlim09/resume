import styles from "../styles/SubBoxContainer.module.scss";

const SubBoxContainer = (props) => {
  const { title: headerTitle } = props;
  return (
    <>
      <div className={styles["sub-box-container-main"]}>
        <div className={styles["sub-box-container-title"]}>
          <span>{headerTitle}</span>
        </div>
        <div {...props}></div>
      </div>
    </>
  );
};

export default SubBoxContainer;
