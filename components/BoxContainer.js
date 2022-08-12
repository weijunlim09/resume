import styles from "../styles/BoxContainer.module.scss";

const BoxContainer = (props) => {
  const { title: headerTitle } = props;
  return (
    <>
      <div className={styles["box-container-main"]}>
        <div>{headerTitle}</div>
        <div {...props}></div>
      </div>
    </>
  );
};

export default BoxContainer;
