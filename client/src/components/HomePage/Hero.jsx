import styles from "./Hero.module.css";
function Hero() {
  return (
    <div className={styles.container}>
      <section className={styles.heading1}>
        <h1 className={styles.buildAdvancedChatbotsContainer}>
          <p className={styles.buildAdvancedChatbots}>
            Build advanced chatbots
          </p>
          <p className={styles.visually}>visually</p>
        </h1>
      </section>
      <div className={styles.container1}>
        <div className={styles.typebotGivesYouContainer}>
          <p className={styles.typebotGivesYou}>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </p>
        </div>
      </div>
      <button className={styles.container2}>
        <div className={styles.link}>
          <div className={styles.createAFormbot}>Create a FormBot for free</div>
        </div>
      </button>
    </div>
  );
}

export default Hero;
