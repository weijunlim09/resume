import React from "react";
import styles from "../styles/Button.module.scss";

// If the child of Link is a functional component,
// in addition to using passHref, you must wrap the component in React.forwardRef:

const Button = React.forwardRef(function Button(
  { onClick, href, isHome },
  ref
) {
  const title = isHome ? "Home" : href?.replace("/", "").split("") || "";
  // passHref pass onclick and href to the child
  return (
    <div
      href={href}
      onClick={onClick}
      ref={ref}
      className={styles["button-main"]}
    >
      {isHome
        ? title
        : title.length > 0 &&
          title
            .map((t, i) => {
              return i == 0 ? t.toUpperCase() : t;
            })
            .join("")}
    </div>
  );
});

export default Button;
