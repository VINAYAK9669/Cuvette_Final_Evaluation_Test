import {
  form_arrow_mark,
  form_gif,
  form_hi_image,
  form_image,
  form_section_sign_left,
  form_section_sign_right,
  formSection_form,
} from "../../data/fileImports";
import styles from "./FormSection.module.css";
function FormSection() {
  return (
    <div className={`flex flex-col ${styles.wrapper}`}>
      <header className={`flex flex-col text-center`}>
        <h1 className={`text-center ${styles.header}`}>
          Replace your old school forms <br></br>with
          <br /> chatbots
        </h1>
        <p className={`text-center ${styles.para}`}>
          Typebot is a better way to ask for information. It leads to an
          increase in customer satisfaction and retention and multiply by <br />
          3<br /> your conversion rate compared to classical forms.
        </p>
      </header>
      <section className={`flex justify-between ${styles.form_bottom_section}`}>
        <div className={`flex flex-col ${styles.flex_bottom_section_gap}`}>
          <div className="flex justify-center">
            <img src={form_section_sign_left} />
          </div>
          <div>
            <img src={formSection_form} />
          </div>
        </div>
        <div>
          <div className={`flex flex-col ${styles.flex_bottom_section_gap}`}>
            <div className="flex justify-center">
              <img src={form_section_sign_right} />
            </div>
            <div className={`flex ${styles.form_right_bottom_section}`}>
              <div className={styles.form_right_bottom_section_userIconDiv}>
                <img src={form_image} />
              </div>
              <div className={`flex flex-col ${styles.message_container}`}>
                <p
                  className={`flex items-center justify-center ${styles.message}`}
                >
                  Welcome to &nbsp;{" "}
                  <span className={styles["message-highlight"]}> AA </span>{" "}
                  &nbsp;(Awesome Agency)
                </p>
                <div
                  className={`flex flex-col justify-center items-center ${styles.message_container} ${styles.image}`}
                >
                  <img src={form_gif} className={styles.img} />
                </div>
                <div className="flex justify-end">
                  <img src={form_hi_image} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Absolute images */}
        <div className={styles.form_section_instruction}>
          <h1 className={styles.float_text}>Try it out!</h1>
        </div>
        <div className={styles.form_section_instruction_img}>
          <img src={form_arrow_mark} />
        </div>
      </section>
    </div>
  );
}

export default FormSection;
