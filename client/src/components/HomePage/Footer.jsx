import styles from "./Footer.module.css";
import icon from "/assets/icons/contact.svg";
function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <p>Made with ❤️ by</p>
          <p> @cuvette</p>
        </div>
        <div>
          <p>
            Status <img src={icon} />
          </p>
          <p>
            Documentation <img src={icon} />
          </p>
          <p>
            Roadmap <img src={icon} />
          </p>
          <p>
            Pricing <img src={icon} />
          </p>
        </div>
        <div>
          <p>
            Discord <img src={icon} />
          </p>
          <p>
            GitHub repository <img src={icon} />
          </p>
          <p>
            Twitter <img src={icon} />
          </p>
          <p>
            LinkedIn <img src={icon} />
          </p>
          <p>
            OSS Friends <img src={icon} />
          </p>
        </div>
        <div>
          <p>
            About <img src={icon} />
          </p>
          <p>
            Contact <img src={icon} />
          </p>
          <p>
            Terms of Service <img src={icon} />
          </p>
          <p>
            Privacy Policy <img src={icon} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
