import styles from "../styles/Sample.module.scss";

const isConnected = ({}) => {
  let n = 8; // Or something else

  return (
    <>
      <div className={`${styles["sample-main"]}`}>
        {[...Array(n)].map((e, i) => (
          <div className="busterCards" key={i}>
            ♦
          </div>
        ))}
      </div>
    </>
  );
};

export default isConnected;
