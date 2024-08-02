import { NavLink } from "react-router-dom";
import {
  her_left_obj,
  her_right_obj,
  hero_image,
} from "../../data/fileImports";
import styles from "./Hero.module.css";
import { useSelector } from "react-redux";
function Hero() {
  const { isAuthenticated, loggedUser } = useSelector((state) => state.auth);
  return (
    <div className={`flex flex-col justify-between ${styles.wrapper}`}>
      <h1 className={`text-center ${styles.heading1}`}>
        Build advanced chatbots <br></br>{" "}
        <span className={styles.headingColor}>visually</span>
      </h1>

      <p className={`text-center ${styles.para}`}>
        Typebot gives you powerful blocks to create unique chat experiences.
        Embed them <br /> anywhere on your web/mobile apps and start collecting
        results like magic.
      </p>

      <NavLink
        to={`${
          isAuthenticated ? `/dashboard/${loggedUser.userID}` : "/signin"
        }`}
        className={`flex items-center justify-center ${styles.button}`}
      >
        <span> Create a FormBot for free</span>
      </NavLink>

      <div className={styles.img_section}>
        <img src={hero_image} />
      </div>
      {/* Below images are background images */}
      <div className={styles.left_img_div}>
        <img src={her_left_obj} />
      </div>
      <div className={styles.right_img_div}>
        <img src={her_right_obj} />
      </div>
    </div>
  );
}

export default Hero;
