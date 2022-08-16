import Image from "next/image";
import React from "react";
import styles from "../styles/Button.module.scss";

// If the child of Link is a functional component,
// in addition to using passHref, you must wrap the component in React.forwardRef:

const Button = React.forwardRef(function Button(
  { onClick, href, isLink, isHome, imgSrc, customTitle },
  ref
) {
  const LOGOWIDTH = "20";
  const LOGOHEIGHT = "20";
  const title = isLink
    ? isHome
      ? "Home"
      : href?.replace("/", "").split("")
    : customTitle;

  if (!isLink) {
    return (
      <>
        <div className={styles["button-main"]} onClick={onClick}>
          <Image
            src={imgSrc}
            width={LOGOWIDTH}
            height={LOGOHEIGHT}
            alt={title}
          ></Image>
          <span>{customTitle}</span>
        </div>
      </>
    );
  }
  // passHref pass onclick and href to the child

  return (
    <>
      <div
        href={href}
        onClick={onClick}
        ref={ref}
        className={styles["button-main"]}
      >
        <Image
          src={imgSrc}
          width={LOGOWIDTH}
          height={LOGOHEIGHT}
          alt={title}
        ></Image>
        <span>
          {isHome
            ? title
            : title.length > 0 &&
              title
                .map((t, i) => {
                  return i == 0 ? t.toUpperCase() : t;
                })
                .join("")}
        </span>
      </div>
    </>
  );
});

export default Button;
