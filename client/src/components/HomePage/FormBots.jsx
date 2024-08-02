import styles from "./FormBot.module.css";

function FormBots() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>
          Improve conversion and user engagement <br />
          with FormBots
        </h1>
        <button className={`${styles.button}`}>Create a FormBot</button>
        <p>
          No trial. Generous <span className={styles.highlighter}>free</span>{" "}
          plan.
        </p>
      </div>
    </div>
  );
}

export default FormBots;
