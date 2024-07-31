import { chat_screenshots } from "../../data/fileImports";
import styles from "./RealTime.module.css";
function RealTime() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Collect results in real-time</h1>
        <p>
          One of the main advantage of a chat application is that you collect
          the user&apos;s responses on each question.
          <br></br>
          <span className={styles.highlighter}>
            You won&apos;t lose any valuable data.
          </span>
        </p>
      </div>
      <div>
        <img src={chat_screenshots} />
      </div>
    </div>
  );
}

export default RealTime;
