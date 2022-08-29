import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Redirect404.module.scss";
const PageNotFound = () => {
  const router = useRouter();
  const [timeToPush, setReadyToPush] = useState(false);
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    var interval = setInterval(() => {
      setCounter((count) => (count -= 1));
    }, 1000);
    var timeout = setTimeout(() => {
      router.push("/", undefined, { shallow: true });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className={styles["redirect-main"]}>
        <div className={styles["redirect-counter"]}>
          Redirect back to home in {counter}
        </div>
        <div className={styles["loader"]}>
          <span>Page Not Found</span>
          <span>404</span>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
