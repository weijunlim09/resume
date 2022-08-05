import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.scss";

const Header = () => {
  const IMAGE_HEIGHT = "20";
  const IMAGE_WIDTH = "20";

  return (
    <>
      <nav className={styles.headerMain}>
        <div className={styles.leftHeader}>
          <h1>Resume</h1>
        </div>
        <div className={styles.rightHeader}>
          <ul className={styles.mainNav}>
            <li>
              <Link href="/">
                <Image
                  src="/home.png"
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  alt="Home"
                ></Image>
              </Link>
            </li>
            <li>
              <Image
                src="/user.png"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt="User"
              ></Image>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Image
                src="/user.png"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt="User"
              ></Image>
              <Link href="/experience">Experience</Link>
            </li>
            <li>
              <Image
                src="/user.png"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt="User"
              ></Image>
              <Link href="/skills">Skills</Link>
            </li>
            <li>
              <Image
                src="/user.png"
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH}
                alt="User"
              ></Image>
              <Link href="/education">Education</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
