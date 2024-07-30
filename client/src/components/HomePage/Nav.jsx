/* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { logo } from "../../data/fileImports";
import styles from "./Nav.module.css";
import { useSelector } from "react-redux";

function Nav() {
  const { isAuthenticated, loggedUser } = useSelector((state) => state.auth);
  return (
    <div className={`flex justify-between items-center ${styles.wrapper}`}>
      <div className={`flex items-center ${styles.logo}`}>
        <img className={styles.svgIcon} loading="lazy" alt="" src={logo} />
        <a className={styles.formbot}>FormBot</a>
      </div>
      <div className={`flex items-center ${styles.button_container}`}>
        {!isAuthenticated && (
          <Link
            to="/signin"
            className={`flex items-center justify-center ${styles.signIn}`}
          >
            <span>Sign in</span>
          </Link>
        )}
        <Link
          to={`${
            isAuthenticated ? `/dashboard/${loggedUser.userID}` : "/signin"
          }`}
          className={`flex items-center justify-center ${styles.createFromButton}`}
        >
          <span>Create a FormBot</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
