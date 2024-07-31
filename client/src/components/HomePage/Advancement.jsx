import { advancement_img1, advancement_img2 } from "../../data/fileImports";
import styles from "./Advancement.module.css";

function Advancement() {
  return (
    <div className={styles.container}>
      <div className={styles.section_1}>
        <div>
          <img src={advancement_img1} />
        </div>
        <div className={styles.sub_section_1}>
          <h1>Easy building experience</h1>
          <p>
            All you have to do is drag and drop blocks to create your app. Even
            if you have custom needs, you can always add custom code.
          </p>
        </div>
      </div>
      <div className={styles.section_1}>
        <div className={styles.sub_section_1}>
          <h1>Embed it in a click</h1>
          <p>
            Embedding your typebot in your applications is a walk in the park.
            Typebot gives you several step-by-step platform- specific
            instructions. Your typebot will always feel &quot;native&quot;.
          </p>
        </div>
        <div>
          <img src={advancement_img2} />
        </div>
      </div>
    </div>
  );
}

export default Advancement;
