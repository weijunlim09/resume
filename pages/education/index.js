import { useRouter } from "next/router";
import styles from "../../styles/Education.module.scss";

const Education = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  // console.log(params);

  if (params.length != 0) {
    return <h1>{params}</h1>;
  }

  // Index.js

  return (
    <>
      <div className={styles["education-main"]}>Education</div>
    </>
  );
};

export default Education;

// [...params] catch all routes
// [[...params]] - index.js + catch all routes
