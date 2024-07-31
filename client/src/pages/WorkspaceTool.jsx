import {
  button_input_icon,
  date_input_icon,
  email_input_icon,
  gif_icon,
  image_icon,
  number_input_icon,
  phone_input_icon,
  rating_input_icon,
  text_icon,
  text_input_icon,
  video_icon,
} from "../data/fileImports";

import styles from "./WorkspaceTool.module.css";

function WorkspaceTool() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.asideContainer}>
        <div className={`flex flex-col`}>
          <h1 className={styles.header}>Bubbles</h1>
          <div className={styles.cards}>
            <div className={styles.options}>
              <img src={text_icon} />
              <p>Text</p>
            </div>
            <div className={styles.options}>
              <img src={image_icon} />
              <p>Image</p>
            </div>
            <div className={styles.options}>
              <img src={video_icon} />
              <p>Video</p>
            </div>
            <div className={styles.options}>
              <img src={gif_icon} />
              <p>GIF</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className={styles.header}>Inputs</h1>
          <div className={styles.cards}>
            <div className={styles.options}>
              <img src={text_input_icon} />
              <p>text</p>
            </div>
            <div className={styles.options}>
              <img src={number_input_icon} />
              <p>Number</p>
            </div>
            <div className={styles.options}>
              <img src={email_input_icon} />
              <p>Email</p>
            </div>
            <div className={styles.options}>
              <img src={phone_input_icon} />
              <p>Phone</p>
            </div>
            <div className={styles.options}>
              <img src={date_input_icon} />
              <p>Date</p>
            </div>
            <div className={styles.options}>
              <img src={rating_input_icon} />
              <p>Rating</p>
            </div>
            <div className={styles.options}>
              <img src={button_input_icon} />
              <p>Buttons</p>
            </div>
          </div>
        </div>
      </aside>
      <div className={styles.mainSpace}>
        <p>Hi</p>
      </div>
    </div>
  );
}

export default WorkspaceTool;
