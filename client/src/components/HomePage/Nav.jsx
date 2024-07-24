/* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { logo } from "../../data/fileImports";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.headerMainNavigation}>
      <div className={styles.container}>
        <div className={styles.link}>
          <img className={styles.svgIcon} loading="lazy" alt="" src={logo} />
          <div className={styles.container1}>
            <a className={styles.formbot}>FormBot</a>
          </div>
        </div>
      </div>
      <div className={styles.nav}>
        <Link className={styles.link1} to="/signin">
          <span className={styles.signIn}>Sign in</span>
        </Link>
        <button className={styles.link2}>
          <a className={styles.createAFormbot}>Create a FormBot</a>
        </button>
      </div>
    </div>
  );
}

export default Nav;
